// Tasks should have the following methods:
//    constructor: context, time_limit
//    draw()
//    click()
//    submit_result()

var current_task = null ;

function task_object(canvas, time_limit, task_base, id, game_id, desk_name){
  this.id = id ;
  this.game_id = game_id ;
  this.desk_name = desk_name ;
  this.canvas = canvas ;
  this.canvas.owner = this ;
  this.context = this.canvas.getContext('2d') ;
  this.running = false ;
  this.time_limit = time_limit ;
  this.time  = 0 ;
  this.delay = 100 ;
  this.base  = task_base ;
  this.base.parent = this ;
  this.win_condition = this.base.win_condition ;
  
  this.error_message = function(){ return this.base.error_message() ; }
  
  this.create_request = function(){
    var request = 'action=create_task&game_id=' + this.game_id + '&role='  + this.desk_name + '&type=' + this.base.name + '&time=' + this.time_limit + '&task_id=' + this.id + '&win_condition=' + this.win_condition ;
    return request ;
  }
  
  this.win_condition_text = function(cond){ return this.base.win_condition_text(cond) ; }
  
  this.update_time_bar = function(){
    var ratio = (this.time_limit-this.time)/this.time_limit ;
    var span = Get('span_task_timer') ;
    span.style.width = Math.floor(ratio*100) + '%' ;
    span.style.backgroundColor = 'green' ;
  }
  this.reset_time_bar = function(){ Get('span_task_timer').style.width = '0%' ; }
  
  // Initialise all the settings
  this.init = function(){
    if(this.base.draw      ) this.draw       = function(evt){ this.base.draw(evt)       ; }
    if(this.base.mouseclick) this.mouseclick = function(evt){ this.base.mouseclick(evt) ; }
    if(this.base.mousedown ) this.mousedown  = function(evt){ this.base.mousedown(evt)  ; }
    if(this.base.mousemove ) this.mousemove  = function(evt){ this.base.mousemove(evt)  ; }
    if(this.base.mouseup   ) this.mouseup    = function(evt){ this.base.mouseup(evt)    ; }
    if(this.base.timeout   ) this.timeout    = function()   { this.base.timeout()       ; }
    this.result = 'started' ;
  }
  
  // Generic functions that are overridden by the base task
  this.draw = function(){
    this.context.fillStyle = 'rgb(255,0,255)' ;
    this.context.fillRect(0,0,cw,ch) ;
    this.context.fillStyle = 'rgb(255,255,255)' ;
    context.font = '50px arial' ;
    this.context.fillText(this.time, cw/2, ch/2) ;
  }
  
  // Handle events
  this.mouseclick = function(evt){}
  this.mousedown  = function(evt){}
  this.mousemove  = function(evt){}
  this.mouseup    = function(evt){}
  
  // Set success, or failure, and close the task
  this.succeed = function(){
    this.result = 'success' ;
    window.setTimeout(success_canvas, 250) ;
    this.shutdown() ;
  }
  this.fail = function(){
    this.result = 'failure' ;
    decrement_lives() ;
    if(nLives>0) window.setTimeout(failure_canvas, 250) ;
    this.shutdown() ;
  }
  this.timeout = function(){
    this.result = 'timeout' ;
    decrement_lives() ;
    if(nLives>0) window.setTimeout(timeout_canvas, 250) ;
    this.shutdown() ;
  }
  
  // Functions to start task
  this.start = function(){
    this.running = true ;
    current_task = this ;
    task_heartbeat() ;
  }
  this.heartbeat = function(){
    if(this.time>=this.time_limit){
      this.running = false ;
      this.timeout() ;
    }
    if(this.running==false) return ;
    this.draw() ;
    this.time += this.delay ;
  }
  
  // When the task is over, clean everything up and send the result
  this.shutdown = function(){
    this.canvas.owner = null ;
    this.base.parent  = null ;
    current_task      = null ;
    this.send_result() ;
    if(nLives>0) window.setTimeout(reset_canvas, 1000) ;
    this.reset_time_bar() ;
  }
  
  this.send_result = function(){
    //xmlhttp_desk[desk_name] = GetXmlHttpObject() ;
    var x = xmlhttp_desk[this.desk_name] ;
    var request = 'action=resolve_task&id='+this.id+ '&outcome='+this.result+ '&role='+this.desk_name+ '&game_id='+game_id ;
    x.onreadystatechange = desks[this.desk_name].fetch_task ;
    x.open('GET', 'request.php?'+request+'&sid='+Math.random(),true) ;
    x.send(null) ;
  }
  
  // Now start everything
  this.init() ;
}

function task_heartbeat(){
  if(null==current_task) return ;
  current_task.heartbeat() ;
  if(null==current_task) return ; // heartbeat can change state of current_task
  window.setTimeout(task_heartbeat, current_task.delay) ;
}

var tasks_coordToDesk = [] ;
var tasks_desk        = [] ;
var task_counter = 0 ;

function canvas_mousedown (evt){ return (null==current_task) ? false : current_task.mousedown(evt)  ; }
function canvas_mousemove (evt){ return (null==current_task) ? false : current_task.mousemove(evt)  ; }
function canvas_mouseup   (evt) {return (null==current_task) ? false : current_task.mouseup(evt)    ; }
function canvas_mouseclick(evt){ return (null==current_task) ? false : current_task.mouseclick(evt) ; }


