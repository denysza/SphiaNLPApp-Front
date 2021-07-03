
import React, { useEffect, useRef, useState} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Paper, 
  Container, 
  Box,
  TablePagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as XLSX from 'xlsx';

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



function Import(props) {
  const { classes } = props;
  
  const inputFile = useRef(null);
  
  const [fileName, setFileName] = useState("");
  const [projectName, setProjectName] = useState("");
  
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState([25]);
  const [page, setPage] = useState([]);
  

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/); 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        } 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
 
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));
 
    setData(list);
    setColumns(columns);
    console.log(list,columns)
  }

  const selectFile = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleImport = (event)=>{

  }




  return (
    <Paper className={classes.paper}>
        <Container maxWidth={false}>
          <Box mt={3}>            
                <Box className="form-div">
                    <label className='form-label-addnew'>
                    プロジェクト名
                    </label>
                    <div className='form-input-addnew'>
                        <input value={projectName} onChange={(e)=>{setProjectName(e.target.value)}} type="text" />
                    </div>
                </Box>
                <Box className="form-div">
                    <label className='form-label-addnew'>
                      対象ファイル
                    </label>
                    <div className='form-input-addnew'>
                        <input type="file" onChange={selectFile} ref={inputFile} style={{ display: 'none' }} multiple accept='.csv'/>
                        <input onClick={(e) => inputFile.current.click()} value={fileName} className="file-input" type="text" readOnly/>
                    </div>
                </Box>
                <Box>
                  <Button className="import-btn" onClick={handleImport}>インポート</Button>
                </Box>
                <Card>
                    <PerfectScrollbar>
                      <Box>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {columns.map((column) => (
                                  <TableCell>
                                    {column.name}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.slice(0, 25).map((item) => (
                                <TableRow
                                  hover
                                  key={item.id}
                                >
                                  {
                                    Object.keys(item).map(key => 
                                      <TableCell>
                                        {item[key]}
                                      </TableCell>
                                    )
                                  }
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={data.length}
                      page={25}
                      rowsPerPage={25}
                      labelRowsPerPage=' '
                    />
                </Card>
                
                 
          </Box>
         
        </Container>
    </Paper>
  );
}

Import.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Import);