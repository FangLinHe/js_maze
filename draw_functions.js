function draw_maze(maze_map, grid_num_cols, grid_num_rows, grid_width, grid_height) {
  // draw walls
  maze_context.fillStyle = "#000";
  for (var r = 0; r < grid_num_rows; r++) {
    for (var c = 0; c < grid_num_cols; c++) {
      if (maze_map[r][c] == 0) {
        maze_context.fillRect(c*grid_width-0.5, r*grid_height-0.5, grid_width+1, grid_height+1);
      }
    }
  }
}
function draw_cur_pos(r, c, grid_width, grid_height) {
  var cent_x = c*grid_width + grid_width/2;
  var cent_y = r*grid_height + grid_height/2;
  var radius = Math.min(grid_width, grid_height)/3;
  maze_context.beginPath();
  maze_context.arc(cent_x, cent_y, radius, 0, Math.PI*2, false);
  maze_context.closePath();
  maze_context.fillStyle = "#00f";
  maze_context.fill();
}
function draw_goal(r, c, grid_width, grid_height) {
  // draw flag
  maze_context.beginPath();
  maze_context.moveTo(c*grid_width+grid_width/3, r*grid_height+grid_height/4);
  maze_context.lineTo(c*grid_width+grid_width*2/3, r*grid_height+grid_height/2);
  maze_context.lineTo(c*grid_width+grid_width/3, r*grid_height+grid_height/2);
  maze_context.lineTo(c*grid_width+grid_width/3, r*grid_height+grid_height/4);
  maze_context.fillStyle = "red";
  maze_context.fill();
  // draw pole
  maze_context.beginPath();
  maze_context.moveTo(c*grid_width+grid_width/3-1, r*grid_height+grid_height/4);
  maze_context.lineTo(c*grid_width+grid_width/3-1, r*grid_height+grid_height*3/4);
  maze_context.strokeStyle = "#000";
  maze_context.lineWidth = 2;
  maze_context.stroke();
}
function draw_smile_face(r, c, grid_width, grid_height) {
  var cent_x = c*grid_width + grid_width/2;
  var cent_y = r*grid_height + grid_height/2;
  var radius = Math.min(grid_width, grid_height)/3;
  maze_context.lineWidth = radius/20;

  // face
  maze_context.beginPath();
  maze_context.arc(cent_x, cent_y, radius-1, 0, Math.PI*2, false);
  maze_context.closePath();
  maze_context.fillStyle = "yellow";
  maze_context.fill();

  // left eye
  maze_context.beginPath();
  maze_context.arc(cent_x-radius/2, cent_y-radius/3, radius/10, 0, Math.PI*2, false);
  maze_context.closePath();
  maze_context.fillStyle = "#000";
  maze_context.fill();

  // right eye
  maze_context.beginPath();
  maze_context.arc(cent_x+radius/2, cent_y-radius/3, radius/10, 0, Math.PI*2, false);
  maze_context.closePath();
  maze_context.fillStyle = "#000";
  maze_context.fill();

  // mouth
  maze_context.beginPath();
  maze_context.arc(cent_x, cent_y, radius*2/3, 0, Math.PI, false);
  maze_context.closePath();
  maze_context.fillStyle = "#f9b";
  maze_context.fill();
  maze_context.strokeStyle = "#000";
  maze_context.stroke();

  // teeth
  maze_context.fillStyle = "#fff";
  maze_context.fillRect(cent_x-radius/4, cent_y, radius/4, radius/3);
  maze_context.rect(cent_x-radius/4, cent_y, radius/4, radius/3);
  maze_context.strokeStyle = "#000";
  maze_context.stroke();
  maze_context.fillRect(cent_x, cent_y, radius/4, radius/3);
  maze_context.rect(cent_x, cent_y, radius/4, radius/3);
  maze_context.strokeStyle = "#000";
  maze_context.stroke();
}
