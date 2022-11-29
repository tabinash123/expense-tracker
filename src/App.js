import { Grid } from '@material-ui/core';
import { Box } from '@mui/system';
import Details from './components/Details/Details';
import useStyle from './styles'
import Main from './components/Main/Main';
import {PushToTalkButton,PushToTalkButtonContainer,ErrorPanel } from '@speechly/react-ui';


function App() {
  const classes = useStyle();
  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={3}>
          <Details title="Income" />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Main />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Details title="Expenses" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
} 

export default App;