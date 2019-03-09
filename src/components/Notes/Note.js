import * as React from 'react';
import { Button, FormControl, InputLabel, Input, Divider } from '@material-ui/core';
import axios from 'axios';
import { connect } from "react-redux"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: { marginTop: 5, marginBottom: 5 },
  button: { margin: 1 },
  header: { paddingBottom: 5 },
  content: { paddingTop: 5 }
};

class Note extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      note: props.note
    };
  }

  
  handleEdit = () => {
    this.setState({ edit: true });
  };

  handleCancel = () => {
    this.setState({ note: this.props.note, edit: false });
  };

  handleSave = async () => {
    const { note } = this.state;
    const { titulo, conteudo } = note;
    await axios.post(`/nota/update/${note._id}`, { titulo, conteudo });
    await this.props.refetchNotes();
  };

  handleDelete = async () => {
    const { note } = this.state;
    await axios.delete(`nota/delete/${note._id}`);
    await this.props.refetchNotes();
  };

  handleChange = e => {
    const { note } = this.state;
    const { name, value } = e.target;
    this.setState({ note: { ...note, [name]: value } });
  };


  
  render() {

    const { edit, note } = this.state;
    const { _id, titulo, conteudo} = note;
    const htmlTitleId = `note-title-${_id}`;
    const htmlTextId = `note-text-${_id}`;

    return (
      <Card style={styles.root}>      
      
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe">A</Avatar>
          }
          action={
            edit ? (
              <div>
            <Button onClick={this.handleCancel} size="small" color="primary">
                cancelar
              </Button>
              <Button  onClick={this.handleSave}  size="small" color="primary">
                salvar
              </Button>
            </div> 
            ) : (
              <div>
                <Button onClick={this.handleDelete} size="small" color="primary">
                  exclui
                </Button>
                <Button  onClick={this.handleEdit}  size="small" color="primary">
                  editar
                </Button>
              </div>             
            )
          }
          title = {
            edit ? (
              <FormControl fullWidth>
                <InputLabel htmlFor={htmlTitleId}>Titulo</InputLabel>
                <Input fullWidth autoFocus id={htmlTitleId} name="titulo" value={titulo} onChange={this.handleChange} multiline />
              </FormControl>
            ) : (
              <Typography gutterBottom variant="body1" component="p">
                {titulo}
              </Typography>
            )
          }
        />
        <CardContent style={styles.content}>
          {edit ? (
            <FormControl fullWidth>
              <InputLabel htmlFor={htmlTextId}>Conteúdo</InputLabel>
              <Input value={conteudo} name="conteudo" id={htmlTextId} onChange={this.handleChange} fullWidth multiline rowsMax={8} />
            </FormControl>
          ) : (
            <Typography gutterBottom variant="body1" component="p">
              {conteudo}
            </Typography>
          )}
          <Divider style={{ marginTop: 15, marginBottom: 10 }} />
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state =>({ nota: state.nota})
export default connect(mapStateToProps)(Note);