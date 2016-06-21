function dfs(path_num_rows, path_num_cols) {
  var maze_map = [];
  var grid_num_cols = path_num_cols*2+1;
  var grid_num_rows = path_num_rows*2+1;
  // initialze the map:
  // fill cells of odd indices (e.g. [1,1], [3,5], etc.) with 1 and the rest with 0.
  for (var r = 0; r < grid_num_rows; r++) {
    maze_map[r] = [];
    for (var c = 0; c < grid_num_cols; c++) {
      maze_map[r][c] = (r%2 == 1) * (c%2 == 1);
    }
  }

  // traversable table is used to record the number of neighbors haven't been traversed
  var num_trav_tbl = [];
  var traversed = [];
  for (var r = 0; r < path_num_rows; r++) {
    num_trav_tbl[r] = [];
    traversed[r] = [];
    for (var c = 0; c < path_num_cols; c++) {
      num_trav_tbl[r][c] = 4 - (r%(path_num_rows-1) == 0) - (c%(path_num_cols-1) == 0);
      traversed[r][c] = false;
    }
  }

  // random depth first traversal
  var cur_pos = [path_num_rows-1, 0]; // [r, c]
  var prev_pos = cur_pos.slice();
  var num_traversed = 0;
  var branch = [0, 0];
  var branch_stack = [];
  const num_nodes = path_num_cols*path_num_rows;

  while (true) { // while num_traversed < num_nodes
    // (all neighbors of current node) - 1
    if (cur_pos[0]-1 >= 0) // up
        num_trav_tbl[cur_pos[0]-1][cur_pos[1]]--;
    if (cur_pos[0]+1 < path_num_rows) // down
        num_trav_tbl[cur_pos[0]+1][cur_pos[1]]--;
    if (cur_pos[1]-1 >= 0) // left
        num_trav_tbl[cur_pos[0]][cur_pos[1]-1]--;
    if (cur_pos[1]+1 < path_num_cols) // right
        num_trav_tbl[cur_pos[0]][cur_pos[1]+1]--;

    // update the number of traversed nodes
    num_traversed++;
    if (num_traversed == num_nodes) break;
    traversed[cur_pos[0]][cur_pos[1]] = true;

    // number of traversable nodes around current node
    var nt = num_trav_tbl[cur_pos[0]][cur_pos[1]];

    // move to the next node
    temp_prev_pos = prev_pos.slice();
    prev_pos = cur_pos.slice();
    var move_direction;
    var rcdir;
    if (nt == 0) { // at the dead-end, go back to the branch
      var nearest_branch = branch_stack.pop();
      while (num_trav_tbl[nearest_branch[0]][nearest_branch[1]] < 1) {
        nearest_branch = branch_stack.pop();
      }
      prev_pos = nearest_branch.slice();
      rcdir = select_neighbor(prev_pos[0], prev_pos[1], traversed, 0);
    }
    else { // randomly choose a non-traversed node
      var rand_node = Math.floor(Math.random()*nt);
      rcdir = select_neighbor(prev_pos[0], prev_pos[1], traversed, rand_node);
    }
    move_direction = rcdir.dir;
    cur_pos = [rcdir.r, rcdir.c];
    var break_pos;
    if (move_direction == 'u') // up
      break_pos = [prev_pos[0]*2, prev_pos[1]*2+1];
    else if (move_direction == 'd') // down
      break_pos = [(prev_pos[0]+1)*2, prev_pos[1]*2+1];
    else if (move_direction == 'l') // left
      break_pos = [prev_pos[0]*2+1, prev_pos[1]*2];
    else if (move_direction == 'r') // right
      break_pos = [prev_pos[0]*2+1, (prev_pos[1]+1)*2];
    maze_map[break_pos[0]][break_pos[1]] = 1;

    // record the branch (i.e. the next node to traverse after meeting the dead-end)
    if (num_trav_tbl[temp_prev_pos[0]][temp_prev_pos[1]] > 0) {
      branch_stack.push(temp_prev_pos);
    }
  }

  return maze_map;
}
function select_neighbor(r, c, traversed, n) {
  const trav_order = [[1,0], [-1,0], [0,-1], [0,1]]; // up, down, left, right
  const direction = ['d', 'u', 'l', 'r'];
  var to_idx = -1; // traverse order index
  for (var i = 0; i <= n; i++) {
    to_idx++;
    if (to_idx > 3)
      alert("Ahh");
    var ng_r = r+trav_order[to_idx][0];
    var ng_c = c+trav_order[to_idx][1];
    if ((ng_r+1)%(traversed.length+1)==0 || (ng_c+1)%(traversed[0].length+1)==0 || traversed[ng_r][ng_c]) {
      i--;
    }

  }
  return {r: r+trav_order[to_idx][0], c: c+trav_order[to_idx][1], dir: direction[to_idx]};
}