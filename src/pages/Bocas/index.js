import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button, Grid, Icon, Item, Image, Label } from 'semantic-ui-react';

import './styles.css';

const paragraph = <Image src='/assets/images/wireframe/short-paragraph.png' />

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      changePage: () => push('/')
    }, dispatch),
  };
}

class Bocas extends Component {

  renderExtraButton = () => {
    return (
      <div className='ui two buttons'>
        <Button basic color='blue'>Editar</Button>
        <Button basic color='red'>Eliminar</Button>
      </div>
    )
  };

  renderCreateButton = () => {
    return (
      <div className='ui two buttons'>
        <Button basic color='green'>Crear</Button>
      </div>
    )
  };

  render () {
    return (
      <div className="Bocas">
        <Grid columns={2} doubling>
          <Grid.Row>
            <Grid.Column className='column-scroll'>
              <Item.Group divided className='available'>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon='globe' content='Additional Languages' />
                    </Item.Extra>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC Cinema</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                      <Label>Limited</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>Watchmen</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>Watchmen</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>Watchmen</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>Watchmen</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column className='column-scroll'>
              <Item.Group divided className='selected'>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon='globe' content='Additional Languages' />
                    </Item.Extra>
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon='globe' content='Additional Languages' />
                    </Item.Extra>
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon='globe' content='Additional Languages' />
                    </Item.Extra>
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon='globe' content='Additional Languages' />
                    </Item.Extra>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC Cinema</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                      <Label>Limited</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Image src='https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>Watchmen</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right'>
                        Buy tickets
                        <Icon name='right chevron' />
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bocas);
