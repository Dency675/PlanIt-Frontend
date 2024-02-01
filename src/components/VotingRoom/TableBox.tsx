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
              <td>Frozen yoghurt</td>
              <td>159</td>
            </tr>
            <tr>
              <td>Ice cream sandwich</td>
              <td>237</td>
            </tr>
            <tr>
              <td>Eclair</td>
              <td>262</td>
            </tr>
            <tr>
              <td>Cupcake</td>
              <td>305</td>
            </tr>
            <tr>
              <td>Gingerbread</td>
              <td>356</td>
            </tr>
          </tbody>
        </Table>
        </Card>
      </div>
    
  );
}
