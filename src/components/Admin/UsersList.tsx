import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useState,useEffect } from 'react';
import { UserList } from '../../pages/Admin/types/UserList';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import { AspectRatio, Card, Skeleton } from '@mui/joy';
import { fetchUsersData } from '../../pages/Admin/apis/usersList';
import { deleteUser } from '../../pages/Admin/apis/RemoveUser';
import { searchUsers } from '../../pages/Admin/apis/SearchUser';



 function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  type Order = 'asc' | 'desc';
  
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const data = comparator(a[0], b[0]);
      if (data !== 0) {
        return data;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  


export default function UsersList() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  // const [open, setOpen] = React.useState(false);
  // const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = useState<UserList[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchUsersData(page)
        if (fetchedData.length === 0) {
          setHasMoreData(false); // No more data available
        } else {
          setData(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false)
      }
    };
    
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 7); 
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 7); 
  };

 



  function RowMenu({ userId }: { userId: string }) {
    
    const handleDelete = async () => {
      try {
        await deleteUser(userId);
        console.log(`User with ID ${userId} deleted successfully.`);
        // setOpen(true)
        setOpenSnackbar(true);
     
      // setData(data.filter(user => user.id !== userId));
      setData(data.map(user => user.id === userId ? {...user, status: 'inactive'} : user));
      console.log("Member:", data);
        
      } catch (error) {
        console.error('Error deleting user :', error);
      }
    };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Assign Team Manager</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={handleDelete}>Delete</MenuItem>
      </Menu>
     
      <Snackbar
        variant="soft"
        color="success"
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => setOpenSnackbar(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        Account has been deactivated
      </Snackbar>
    </Dropdown>
  );
}

  // const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleSearch = async (e:any) => {
    setSearchQuery(e.target.value);
    try {
      const searchResults = await searchUsers(e.target.value); 
      setData(searchResults);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    
    <React.Fragment>

      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
            onChange={handleSearch}
         value={searchQuery}        
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>
      <Box  
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for user</FormLabel>
          <Input  value={searchQuery}
        onChange={handleSearch} size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {/* <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button> */}
        {/* {renderFilters()} */}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== data.length
                  }
                  checked={selected.length === data.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? data.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === data.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 140, padding: '12px 10px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  User Id
                </Link>
              </th>
              <th style={{ width: 230, padding: '12px 10px' }}>Name</th>
              <th style={{ width: 160, padding: '12px 10px' }}>Status</th>
              <th style={{ width: 160, padding: '12px 10px' }}>Department</th>
              <th style={{ width: 140, padding: '12px 10px' }}>Set Role </th>
            </tr>
          </thead>
          <tbody>
            
            {stableSort(filteredRows, getComparator(order, 'id')).map((row) => (
              
              //  {filteredRows.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{ row.givenName.charAt(0).toUpperCase()}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.givenName}</Typography>
                      <Typography level="body-xs">{row.email}</Typography>
                    </div>
                  </Box>
                 
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        active: <CheckRoundedIcon />,
                        // inactive: <AutorenewRoundedIcon />,
                        inactive: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        active: 'success',
                        // inactive: 'neutral',
                        inactive: 'danger',
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                <Typography level="body-xs">{row.department}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* <Link level="body-xs" component="button">
                      Download
                    </Link> */}
                    <RowMenu userId={row.id}  />

                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
    
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={handlePrevPage} disabled={page === 0}
        >
          Previous
        </Button>
         {hasMoreData && 
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
          onClick={handleNextPage}
          disabled={!hasMoreData}
        >
          Next
        </Button>}
      </Box>
    </React.Fragment>
    
  );
}
