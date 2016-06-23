# Javascrip Maze
I wrote this simple maze game to practice HTML5's canvas and javascript.  The current version of webpage is only suitable on computer, not mobile devices.

## How to play:
You can go to [this website](http://fanglinhe.wix.com/fanglinhe#!javascript/nwibq) to play the game.  It redirects to a page on GoogleDrive, it will be avaialbe at least by the end of July, 2016.  Simply use the arrow keys on your keyboard to move the blue ball and try to reach the goal with red flag.  Number of steps you have moved will be shown as ```Moves: 0``` on the page.  The black bricks are the wall which you can not pass through.  After reaching the goal, a smile face will be shown on the blue ball and the message ```You have reached the goal!``` will be shown on page.  You can press ```Click to restart the game``` to restart the game at anytime.

## Current status:
* 22-June-2016: A form was added to control the maze size and maze generation algorithm.
* 22-June-2016: I implemented randomized Kruskal's algorithm mentioned [here](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Kruskal.27s_algorithm) with loops instead of recursion.  Now planning to add web forms to modify the size of the maze and the maze generation method.  Next I would try to modify the data structure to make the code clearer.
* 21-June-2016: I implemented depth-first search method mentioned [here](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Depth-first_search) with loops instead of recursion.
* 20-June-2016: So far, the maze's map is fixed.  I would like to implement several algorithms mentioned on [Wiki page](https://en.wikipedia.org/wiki/Maze_generation_algorithm).

## Screenshot:
![alt tag](resources/images/screenshot.png)