import * as React from 'react';
import { Fab, CssBaseline, Grid, Typography, CircularProgress, Button, Icon, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Input, FormControl } from '@material-ui/core';
import { connect } from "react-redux"
import axios from 'axios';
import Note from './Note';


import { actionChangeNota } from '../../store/actions/nota'
import { actionChangeLoad } from '../../store/actions/load'

const styles = {
  formField: {
    margin: '10px 0'
  },
  loadRoot: {
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};


class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      newNote: {
        titulo: '',
        conteudo: ''
      },
      error: false
    };
  }

  async componentDidMount() {
    await this.fetchNotes();
    // console.log("index nota", this.props )
  }

  static getDerivedStateFromProps = () => {
    return null;
  };


  fetchNotes = async () => {
    this.props.dispatch(actionChangeLoad(true));
    try {
      const { data } = await axios.get('/nota/lista');
      this.props.dispatch(actionChangeNota(data))
      this.props.dispatch(actionChangeLoad(false));
    } catch (error) {
      console.log(error)
      this.props.dispatch(actionChangeLoad(false));
    }
  };


  handleChange = e => {
    const { newNote } = this.state;
    const { name, value } = e.target;

    this.setState({ newNote: { ...newNote, [name]: value } });
  };

  handleDiglogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({
      openDialog: false,
      newNote: {
        titulo: '',
        conteudo: ''
      }
    });
  };

  handleNoteAdd = async () => {
    const { titulo, conteudo } = this.state.newNote;
    try {

      await axios.post('/nota/add', { titulo, conteudo });

      this.fetchNotes();

      this.setState({
        openDialog: false,
        newNote: {
          titulo: '',
          conteudo: ''
        }
      });
    } catch (e) {
      this.setState({
        error: true,
        openDialog: false,
        newNote: {
          titulo: '',
          conteudo: ''
        }
      });
    }
  };

  render() {

    const { error, openDialog, newNote } = this.state;
    const { titulo, conteudo } = newNote;

    if (error) return 'error';
    return (
      <React.Fragment>
        <Typography variant="headline">Suas anotações</Typography>
        <Grid container spacing={8}>
          {this.props.load ? (
            <Grid container style={styles.loadRoot}>
              <CssBaseline />
              <CircularProgress size={60} />
              <Typography variant="title">Carregando...</Typography>
            </Grid>
          ) : (
              this.props.nota.map(note => (
                <Grid key={note._id} item md={4} xs={12} sm={6}>
                  <Note refetchNotes={this.fetchNotes} note={note} />
                </Grid>
              ))
            )}
        </Grid>
        <React.Fragment>
  
          <Fab 
            color="primary" 
            aria-label="Add" 
            onClick={this.handleDiglogOpen} 
            style={{ position: 'fixed', 
            right: 50, bottom: 50 }} >
            < Icon>add_icon</Icon>
          </Fab>

          <Dialog open={openDialog} onClose={this.handleDialogClose}>
            <DialogTitle>Nova nota</DialogTitle>
            <DialogContent>
              <FormControl style={styles.formField} fullWidth>
                <InputLabel htmlFor="add-note-title">Título</InputLabel>
                <Input
                  fullWidth
                  autoFocus
                  id="add-note-title"
                  name="titulo"
                  value={titulo}
                  onChange={this.handleChange}
                  multiline
                />
              </FormControl>
              <FormControl style={styles.formField} fullWidth>
                <InputLabel htmlFor="add-note-text">Conteúdo</InputLabel>
                <Input
                  value={conteudo}
                  name="conteudo"
                  id="add-note-text"
                  onChange={this.handleChange}
                  fullWidth
                  multiline
                  rowsMax={10}
                  rows={3}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Cancelar
                </Button>
              <Button onClick={this.handleNoteAdd} color="primary">
                Salvar
                </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ nota: state.nota, load: state.load })
export default connect(mapStateToProps)(Notes);
