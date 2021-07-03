import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
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

function AnnotationSearchResult(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>      
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>
                sentence
                </TableCell>
                <TableCell>
                flag
                </TableCell>
                <TableCell>
                text
                </TableCell>
                <TableCell>
                predicted_flag
                </TableCell>
                <TableCell>
                confidence_score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Paper>
  );
}

AnnotationSearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnotationSearchResult);