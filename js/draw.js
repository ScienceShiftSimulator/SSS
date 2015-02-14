function draw_face(context){
  context.fillStyle = 'rgb(100,100,100)' ;
  context.fillRect(0,0,100,100) ;
  
  context.fillStyle = 'rgb(255,255,255)' ;
  context.save() ;
  context.translate(50,150) ;
  context.arc(0,0,80,0,2*Math.PI,true)
  context.fill() ;
  context.restore() ;
  
  context.translate(50,40) ;
  context.arc(0,0,35,0,2*Math.PI,true)
  context.fill() ;
}
function wrapText(context,text,x,y_in,maxWidth,lineHeight,draw){
  // Taken from www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  if(text==undefined) return 0 ;
  var words = text.split(' ') ;
  var line = '' ;
  var w = 0 ;
  var h = 0 ;
  var y = 0 ;

  for(var n=0 ; n<words.length ; n++){
    var testLine = line + words[n] + ' ' ;
    var testWidth = context.measureText(testLine).width ;
    if(testWidth>maxWidth){
      y = y_in+h ;
      if(draw) context.fillText(line, x, y) ;
      line = words[n] + ' ' ;
      h += lineHeight ;
    }
    else{
      line = testLine ;
      if(testWidth>w) w = testWidth ;
    }
  }
  y = y_in+h ;
  context.textBaseline = 'top' ;
  if(draw) context.fillText(line, x, y) ;
  h += lineHeight ;
  if(draw==-1) return w ;
  return h ;
}


function reset_canvas(){
  context.drawImage(Get('img_ACR'),0,0) ;
  context.fillStyle = 'rgba(255,255,255,0.5)' ;
  context.fillRect(0,0,1000,1000) ;
}
function large_text(text, color){
  context.fillStyle = color ;
  context.fillRect(0,0,cw,ch) ;
  context.fillStyle = 'white' ;
  context.textAlign = 'center' ;
  context.textBaseline = 'middle' ;
  context.font = '100px arial' ;
  context.fillText(text,cw/2,ch/2) ;
}
function  success_canvas(){ large_text('WIN!'      , 'green') ; }
function  failure_canvas(){ large_text('FAIL'      , 'red'  ) ; }
function  timeout_canvas(){ large_text('TIMEOUT'   , 'red'  ) ; }
function gameover_canvas(){ large_text('BEAM LOSS!', 'red'  ) ; }
