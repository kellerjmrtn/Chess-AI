<?php 


?>

<!DOCTYPE html>
<html>
    <head>
        <title>Chess</title>
        <link href="stylesheet.css" type="text/css" rel="stylesheet">
    </head>
    <body>
        <h1>Chess</h1>
        <div id="board">
            <div class="rank" id="r-8">
                <div class="square sq-green" id="sq-18"></div>
                <div class="square sq-white" id="sq-28"></div>
                <div class="square sq-green" id="sq-38"></div>
                <div class="square sq-white" id="sq-48"></div>
                <div class="square sq-green" id="sq-58"></div>
                <div class="square sq-white" id="sq-68"></div>
                <div class="square sq-green" id="sq-78"></div>
                <div class="square sq-white" id="sq-88"></div>
            </div>
            <div class="rank" id="r-7">
                <div class="square sq-white" id="sq-17"></div>
                <div class="square sq-green" id="sq-27"></div>
                <div class="square sq-white" id="sq-37"></div>
                <div class="square sq-green" id="sq-47"></div>
                <div class="square sq-white" id="sq-57"></div>
                <div class="square sq-green" id="sq-67"></div>
                <div class="square sq-white" id="sq-77"></div>
                <div class="square sq-green" id="sq-87"></div>
            </div>
            <div class="rank" id="r-6">
                <div class="square sq-green" id="sq-16"></div>
                <div class="square sq-white" id="sq-26"></div>
                <div class="square sq-green" id="sq-36"></div>
                <div class="square sq-white" id="sq-46"></div>
                <div class="square sq-green" id="sq-56"></div>
                <div class="square sq-white" id="sq-66"></div>
                <div class="square sq-green" id="sq-76"></div>
                <div class="square sq-white" id="sq-86"></div>
            </div>
            <div class="rank" id="r-5">
                <div class="square sq-white" id="sq-15"></div>
                <div class="square sq-green" id="sq-25"></div>
                <div class="square sq-white" id="sq-35"></div>
                <div class="square sq-green" id="sq-45"></div>
                <div class="square sq-white" id="sq-55"></div>
                <div class="square sq-green" id="sq-65"></div>
                <div class="square sq-white" id="sq-75"></div>
                <div class="square sq-green" id="sq-85"></div>
            </div>
            <div class="rank" id="r-4">
                <div class="square sq-green" id="sq-14"></div>
                <div class="square sq-white" id="sq-24"></div>
                <div class="square sq-green" id="sq-34"></div>
                <div class="square sq-white" id="sq-44"></div>
                <div class="square sq-green" id="sq-54"></div>
                <div class="square sq-white" id="sq-64"></div>
                <div class="square sq-green" id="sq-74"></div>
                <div class="square sq-white" id="sq-84"></div>
            </div>
            <div class="rank" id="r-3">
                <div class="square sq-white" id="sq-13"></div>
                <div class="square sq-green" id="sq-23"></div>
                <div class="square sq-white" id="sq-33"></div>
                <div class="square sq-green" id="sq-43"></div>
                <div class="square sq-white" id="sq-53"></div>
                <div class="square sq-green" id="sq-63"></div>
                <div class="square sq-white" id="sq-73"></div>
                <div class="square sq-green" id="sq-83"></div>
            </div>
            <div class="rank" id="r-2">
                <div class="square sq-green" id="sq-12"></div>
                <div class="square sq-white" id="sq-22"></div>
                <div class="square sq-green" id="sq-32"></div>
                <div class="square sq-white" id="sq-42"></div>
                <div class="square sq-green" id="sq-52"></div>
                <div class="square sq-white" id="sq-62"></div>
                <div class="square sq-green" id="sq-72"></div>
                <div class="square sq-white" id="sq-82"></div>
            </div>
            <div class="rank" id="r-1">
                <div class="square sq-white" id="sq-11"></div>
                <div class="square sq-green" id="sq-21"></div>
                <div class="square sq-white" id="sq-31"></div>
                <div class="square sq-green" id="sq-41"></div>
                <div class="square sq-white" id="sq-51"></div>
                <div class="square sq-green" id="sq-61"></div>
                <div class="square sq-white" id="sq-71"></div>
                <div class="square sq-green" id="sq-81"></div>
            </div>
        </div>

        <button id="undo">Undo!</button>


        <script src="chess.js" type="module"></script>
    </body>
</html>
