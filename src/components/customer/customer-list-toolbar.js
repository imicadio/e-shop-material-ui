import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export const CustomerListToolbar = ({ title, search, crud, handleAlert, selected = [] }) => {
  const renderFromCart =
    selected.length > 0 ? (
      <Button
        startIcon={<DeleteSweepIcon fontSize="small" />}
        sx={{ mr: 1 }}
        onClick={handleAlert}
      >
        Remove from cart
      </Button>
    ) : null;

  const actionCrud = (
    <>
      <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
        Import
      </Button>
      <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
        Export
      </Button>
      <Button color="primary" variant="contained">
        Add Customers
      </Button>
    </>
  );

  const renderActionCRUD = crud ? { actionCrud } : null;

  const renderSearch = search ? (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  ) : null;

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          {title}
        </Typography>
        <Box sx={{ m: 1 }}>
          {renderFromCart}
          {renderActionCRUD}
        </Box>
      </Box>

      {renderSearch}
    </Box>
  );
};
