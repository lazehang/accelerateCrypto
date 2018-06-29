import React from 'react';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../redux/coin/actions';
import Header from './Header';
import { Link } from 'react-router-dom';
import { CryptoCard } from 'react-ui-cards';
import Loader from './Loader';
import ChangeBadge from './ChangeBadge';
import { Form, FormGroup, Label, Input, Card, Badge, Button, CardImg, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody } from 'reactstrap';
// also available as `default`

class PureCoinList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            coins:{},
            hasNoSearchResult: false
        }
    }


    componentWillMount = () => {
        this.props.loadCoins();
        this.setState({
            coins: this.props.coins
        })
    }

    ImageExist = (url) => {
        var img = new Image();
        img.src = url;
        return img.height != 0;
    }

    handleSearchChange = (e) => {
        this.setState({
            query: e.target.value
            });

    }

    search = () => {
        const coins = this.props.coins;
        const query = this.state.query;
        let searchResults = [];
        Object.keys(coins).map((k,v) => {
            if (coins[k].name.search(query) != -1 || coins[k].symbol.search(query) != -1) {
                searchResults.push(coins[k]);
            }
        });

        if (searchResults.length === 0) {
            this.setState({
                    hasNoSearchResult: true
            })
            searchResults.push({err: "no results"})
        } else {
            this.setState({
                coins: searchResults,
                hasNoSearchResult: false
            })
        }

    }

    removeSearch = () => {
        this.setState({
            query:'',
            coins: this.props.coins
        })
    }


    render() {
        let coins = this.props.coins;
        if (this.state.coins.length > 0) {

            coins = this.state.coins;

        }
        console.log(this.state.hasNoSearchResult)


        return (

            <section id="coinList">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto text-center">
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Search</Label>
                            <Input type="text" id="examplePassword" onChange={this.handleSearchChange} value={this.state.query} placeholder="BTC" />
                            </FormGroup>
                            <Button onClick={this.search}>Search</Button>
                        </Form>
                        { this.state.query.length > 0 ? (<Badge onClick={this.removeSearch}>{this.state.query} x</Badge>) : '' }

                        {
                            this.state.hasNoSearchResult ? 'No Results' :
                            (
                                <CardColumns>

                                    {
                                        Object.keys(coins).map((k,v) => (

                                            <Card key={coins[k].id}>
                                            {
                                                this.ImageExist(`./images/${coins[k].symbol}.png`) ?
                                                <CardImg top className="card-img-over" src={`./images/${coins[k].symbol}.png`} alt="Card image cap" /> : <CardImg top className="card-img-over" src={`./images/GBYTE.png`} alt="Card image cap" />
                                            }

                                                <CardBody>
                                                <CardTitle>{coins[k].name}</CardTitle>
                                                <CardSubtitle>{coins[k].symbol}</CardSubtitle>
                                                <CardText>HKD {coins[k].quotes.HKD.price} <ChangeBadge change={coins[k].quotes.HKD.percent_change_24h} /></CardText>
                                                <Link to={`/coins/${coins[k].id}`}>Buy</Link>
                                                </CardBody>
                                            </Card>

                                        ))
                                    }
                                </CardColumns>
                            )
                        }

                    </div>
                    </div>
                </div>
                </section>
        )

    }
}

const CoinList = connect((rootState) => ({
  coins: rootState.coin.coins
}), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins())}
}))(PureCoinList);

export default CoinList;
