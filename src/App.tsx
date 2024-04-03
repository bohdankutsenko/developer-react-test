import { useState } from "react";
import { HighchartsWidget } from "./widgets";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import versionsData from "./dataSources/versions.json";
import productsData from "./dataSources/products.json";
import regionsData from "./dataSources/regions.json";
import HandsontableWidget from "./widgets/heatmap/HandsontableWidget";

enum ButtonNameEnum {
  VERSION = 'VERSIONS',
  PRODUCT = 'PRODUCTS',
  REGION = 'REGIONS',
}

function App() {
  const [selected, setSelected] = useState<ButtonNameEnum>(ButtonNameEnum.VERSION);
  const [tableHeaders, setTableHeaders] = useState<string[]>(versionsData.tableHeaders);
  const [tableData, setTableData] = useState<any[]>(versionsData.tableData);

  const loadVersions = () => {
    setSelected(ButtonNameEnum.VERSION);
    setTableHeaders(versionsData.tableHeaders);
    setTableData(versionsData.tableData);
  }

  const loadProducts = () => {
    setSelected(ButtonNameEnum.PRODUCT);
    setTableHeaders(productsData.tableHeaders);
    setTableData(productsData.tableData);
  }

  const loadRegions = () => {
    setSelected(ButtonNameEnum.REGION);
    setTableHeaders(regionsData.tableHeaders);
    setTableData(regionsData.tableData);
  }

  return (
    <Box className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ fontSize: 20, flexGrow: 1 }}
          >
            Developer Assessment
          </Typography>
          <Box>
            <Typography
              variant="overline"
              component="span"
              sx={{ marginRight: 3 }}
            >
              Data Source:
            </Typography>
            <Button variant={selected === ButtonNameEnum.VERSION ? "contained" : "text"} size="small" onClick={loadVersions}>
              Versions
            </Button>
            <Button variant={selected === ButtonNameEnum.PRODUCT ? "contained" : "text"} size="small" sx={{ margin: "0 15px" }} onClick={loadProducts}>
              Products
            </Button>
            <Button variant={selected === ButtonNameEnum.REGION ? "contained" : "text"}  size="small" onClick={loadRegions}>
              Regions
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 3 }} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Highcharts Heatmap
            </Typography>
            <Alert severity="warning">
              Please modify the highcharts-widget so that it returns a heatmap
              using &nbsp;
              <Link
                href="https://www.npmjs.com/package/highcharts"
                target="_blank"
              >
                highcharts
              </Link>
              .
            </Alert>
            <HighchartsWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Handsontable Heatmap
            </Typography>
            <Alert severity="warning">
              Please modify the handsontable-widget so that it returns a heatmap
              using &nbsp;
              <Link
                href="https://www.npmjs.com/package/handsontable"
                target="_blank"
                underline="hover"
              >
                handsontable
              </Link>
            </Alert>
            <HandsontableWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
