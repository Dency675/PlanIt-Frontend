import Table from '@mui/joy/Table';
import React from 'react';
import Card from '@mui/joy/Card';

export default function TableBox() {
  return (
    
      <div style={{ maxHeight: '40%', overflow: 'auto' }}><Card>
        <Table aria-label="basic table"  stickyHeader  sx={{ border: 'none' }}>
          <thead>
            <tr>
              <th><b>Name</b></th>
              <th><b>Point</b></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aljo</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Dency</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Mariyam</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Hari</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Geevarghese</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Angelkina</td>
              <td>4</td>
            </tr>
          </tbody>
        </Table>
        </Card>
      </div>
    
  );
}
