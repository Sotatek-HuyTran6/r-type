import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Select,
  IconButton,
  MenuItem,
  InputLabel,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CustomTable, CustomTableColumn } from 'types/common';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';

function CutomizedTable({ rows, columns, pagination }: CustomTable) {
  const handleClickPrevPage = () => {
    pagination?.onChange(pagination.current - 1, pagination.pageSize);
  };

  const handleClickNextPage = () => {
    pagination?.onChange(pagination.current + 1, pagination.pageSize);
  };

  const handleChangePageSize = (event: SelectChangeEvent) => {
    pagination?.onChange(0, Number(event.target.value));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map((column: CustomTableColumn, index: number) => {
                return (
                  <TableCell
                    align={column.align}
                    width={column.width}
                    key={index}
                    sx={{ padding: '16px 8px' }}
                  >
                    {column.title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '0px' }}
              >
                {columns.map((column: CustomTableColumn, index: number) => {
                  const render = column.render(column.key ? row[column.key] : '', row);
                  return (
                    <TableCell align={column.align} key={index} sx={{ padding: '8px' }}>
                      {render}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          justifyContent: 'flex-end',
          display: 'flex',
          gap: '24px',
          padding: '16px 0 100px 0',
        }}
      >
        <Paper sx={{ padding: '16px', minWidth: '100px' }}>
          <FormControl fullWidth variant='standard'>
            <InputLabel id='demo-simple-select-label'>limit</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={String(pagination.pageSize)}
              label='Age'
              onChange={handleChangePageSize}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </FormControl>
        </Paper>
        <Paper sx={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: '8px' }}>
            page {pagination?.current + 1} of {pagination.total}
          </Typography>
          <IconButton disabled={pagination?.current + 1 === 1} onClick={handleClickPrevPage}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={pagination?.current + 1 === pagination.total}
            onClick={handleClickNextPage}
          >
            <ChevronRightIcon />
          </IconButton>
        </Paper>
      </Box>
    </div>
  );
}

export default CutomizedTable;
