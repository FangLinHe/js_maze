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

// --------------------------------------------------

function kruskal(path_num_rows, path_num_cols) {
  const num_cells = path_num_rows*path_num_cols;
  var maze_map = [];
  var grid_num_cols = path_num_cols*2+1;
  var grid_num_rows = path_num_rows*2+1;
  // initialze the map:
  // fill cells of odd indices (e.g. [1,1], [3,5], etc.) with 1 and the rest with 0.
  // 1's represent paths, and 0's represent walls.
  for (var r = 0; r < grid_num_rows; r++) {
    maze_map[r] = [];
    for (var c = 0; c < grid_num_cols; c++) {
      maze_map[r][c] = (r%2 == 1) * (c%2 == 1);
    }
  }

  // create a list of all walls
  var walls = [];
  // each cell is represented by r*path_num_cols+c,
  // where r is the row index and c is the column index.
  // horizontal walls
  for (var r = 0; r < path_num_rows-1; r++) {
    for (var c = 0; c < path_num_cols; c++) {
      var cell1_idx = r*path_num_cols+c;
      var cell2_idx = (r+1)*path_num_cols+c;
      var wall_pos = [(r+1)*2, c*2+1];
      walls.push({cell1_idx: cell1_idx, cell2_idx: cell2_idx, wall_pos: wall_pos});
    }
  }
  // vertical walls
  for (var r = 0; r < path_num_rows; r++) {
    for (var c = 0; c < path_num_cols-1; c++) {
      var cell1_idx = r*path_num_cols+c;
      var cell2_idx = r*path_num_cols+c+1;
      var wall_pos = [r*2+1, (c+1)*2];
      walls.push({cell1_idx: cell1_idx, cell2_idx: cell2_idx, wall_pos: wall_pos});
    }
  }

  // create a set for each cell
  var cell_sets = [];
  var cell_sets_idx = [];
  for (var r = 0; r < path_num_rows; r++) {
    for (var c = 0; c < path_num_cols; c++) {
      var set_obj = new Set();
      var idx = r*path_num_cols+c;
      set_obj.add(idx);
      cell_sets.push(set_obj);
      cell_sets_idx.push(idx);
    }
  }

  // for each wall, in some random order
  walls = shuffle(walls);
  for (let w of walls) {
    var cell1_idx = w.cell1_idx;
    var cell2_idx = w.cell2_idx;
    var wall_pos = w.wall_pos;
    // if the cells divided by this wall belong to distinct sets
    if (cell_sets_idx[cell1_idx] != cell_sets_idx[cell2_idx]) {
      // remove the current wall
      maze_map[wall_pos[0]][wall_pos[1]] = 1;
      // join the sets of the formerly divided cells.
      if (cell_sets[cell_sets_idx[cell1_idx]].size < cell_sets[cell_sets_idx[cell2_idx]].size) {
        var tmp = cell1_idx;
        cell1_idx = cell2_idx;
        cell2_idx = tmp;
      }
      var del_set_idx = cell_sets_idx[cell2_idx];
      for (let item of cell_sets[del_set_idx]) {
        cell_sets[cell_sets_idx[cell1_idx]].add(item);
        cell_sets_idx[item] = cell_sets_idx[cell1_idx];
      }
      cell_sets[del_set_idx].clear();
      if (cell_sets[cell_sets_idx[cell1_idx]].size == num_cells)
        break;
    }
  }

  return maze_map;
}

function shuffle(array) {
  var current_index = array.length, temporary_value, random_index;

  // While there remain elements to shuffle...
  while (0 !== current_index) {

    // Pick a remaining element...
    random_index = Math.floor(Math.random() * current_index);
    current_index--;

    // And swap it with the current element.
    temporary_value = array[current_index];
    array[current_index] = array[random_index];
    array[random_index] = temporary_value;
  }

  return array;
}