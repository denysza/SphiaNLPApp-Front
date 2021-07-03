import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Button
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Annotation(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <Box className="form-div">
          <label className='form-label-addnew'>
          対象ファイル
          </label>
          <div className='form-input-addnew'>
               <input type="text" /> 
          </div>
      </Box>
      <Box className="form-div">
          <label className='form-label-addnew'>
          検索条件
          </label>
          <div className='form-input-addnew'>
          <input type="text" />
          </div>
      </Box>
      <Box className="form-div">
          <div className='form-label-addnew trim-area'>
            <div class="trim-label">trim</div>
            <div className="sub-label">
              <label>前</label>
              <label>後</label>
            </div>
          </div>
          <div className='form-input-addnew'>
          <input type="text" />
          <input type="text" />
          </div>
      </Box>
      <Box>
        <Button className="import-btn">検索</Button>
      </Box>
    </Paper>
  );
}

Annotation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Annotation);