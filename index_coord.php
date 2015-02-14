<?php include_once('mysql.php') ; ?>
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en' xmlns:fb="http://ogp.me/ns/fb#">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<link type="text/css" rel="stylesheet" media="all" href="style2.css" />
<script type="text/javascript" src="/aidansean/MathJax/MathJax.js"></script>
<script type="text/javascript" src="/aidansean/external_links.js"></script>
<script type="text/javascript" src="/aidansean/cookie_jar.js"></script>
<title>Science Shift Simulator</title> 
<link type="text/css" rel="stylesheet" media="all" href="style.css" />
<script src="js/settings.js"></script>
<script src="js/helper.js"></script>
<script src="js/ajax.js"></script>
<script src="js/functions.js"></script>
<script src="js/controls.js"></script>
<script src="js/draw.js"></script>
<script src="js/task.js"></script>
<script src="js/role_A.js"></script>
</head>
<body lang="en" onload="start()">
<div id="outer_container">
<div id="container">
  <div id="heading">
    <div class="tab">
      <div class="tab_row">
        <div class="tab_cell left">
          <h1>Science Shift Simulator</h1>
        </div>
        <div class="tab_cell right">
          <div id="tagline">8 hours of fun in 8 minutes!</div>
        </div>
      </div>
    </div>
    <hr class="clear" />
  </div>
  <div id="content">

<div class="right">
  <div class="blurb">
    <h3>Shift Leader</h3>
    <p>Game id:<span id="span_game_id"></span></p>
    <table id="table_timerLumi">
      <tbody>
        <tr>
          <td class="timerLumi"><div id="div_timer"></div></td>
          <td class="timerLumi"><div id="div_lumi">L = <span id="span_lumi">0</span>nb<sup>-1</sup></div></td>
        </tr>
      </tbody>
    </table>
    <table id="table_lives">
      <tbody>
        <tr>
          <td class="td_life_alive td_life" id="td_life_1">1</td>
          <td class="td_life_alive td_life" id="td_life_2">2</td>
          <td class="td_life_alive td_life" id="td_life_3">3</td>
          <td class="td_life_alive td_life" id="td_life_4">4</td>
          <td class="td_life_alive td_life" id="td_life_5">5</td>
        </tr>
      </tbody>
    </table>
    <canvas id="canvas_main" width="750px" height="250px"></canvas>
    <input type="submit" id="button_create_task_A" value="Start!"/><br />
    <table>
      <thead>
        <tr>
          <th class="task" id="th_task_id">id</th>
          <th class="task" id="th_task_status">Status</th>
          <th class="task" id="th_task_desk">Desk</th>
          <th class="task" id="th_task_problem">Problem</th>
          <th class="task" id="th_task_solution">Solution</th>
        </tr>
      </thead>
      <tbody id="tbody_tasklist">
      </tbody>
    </table>
    <div id="div_hidden_image">
      <img id="img_ACR" src="images/ACR.jpg"/>
      <audio id="audio_dump">
        <source src="flush.wav" type="audio/mpeg">
        <embed height="50" width="100" src="flush.wav">
      </audio>
    </div>
  </div>
</div>


  </div>
  
  <div id="footer">&copy; 2014 Aidan Randle-Conde
  <br />
  Validation: <a href="http://validator.w3.org/check?uri=referer">HTML5</a> / <a href="http://jigsaw.w3.org/css-validator/check/referer?profile=css3">CSS</a>
  <span id="span_cookie_jar">List cookies</span>
  </div>
  
</div>
</div>
</body>
</html>