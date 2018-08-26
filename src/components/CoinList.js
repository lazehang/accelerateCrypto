import React from 'react';
import { connect } from 'react-redux';
import { remoteFetchCoins } from '../redux/coin/actions';
import { Link } from 'react-router-dom';
import ChangeBadge from './ChangeBadge';
import { Form, FormGroup, Label, Input, Card, Badge, CardTitle, CardText, CardColumns,
 CardSubtitle, CardBody } from 'reactstrap';
import ReactLoading from 'react-loading';
import Img from 'react-image'

// also available as `default`

class PureCoinList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            coins:{},
            hasNoSearchResult: false,
            componentsLoading: true
        }
    }

    componentDidMount = () => {

    }


    componentWillMount = () => {
        this.props.loadCoins();
        this.setState({
            coins: this.props.coins
        })
    }

    handleSearchChange = (e) => {
        this.setState({
            query: e.target.value
            });

    }

    round(num) {
        return Math.round(num * 100) / 100;
    }

    search = (e) => {
        e.preventDefault();
        const coins = this.props.coins;
        const query = this.state.query;
        let searchResults = [];
        Object.keys(coins).map((k,v) => {
            if (coins[k].name.search(query) !== -1 || coins[k].symbol.search(query) !== -1) {
                searchResults.push(coins[k]);
            }
            return searchResults;
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
       
        return (

            <section id="coinList">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto text-center">
                        <Form inline className="mx-auto">
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mx-auto">
                            <Label className="mr-sm-2">Search</Label>
                            <Input className="form-control" type="text" id="examplePassword" onChange={this.handleSearchChange} value={this.state.query} placeholder="BTC" />
                            <button className="btn btn-primary form-control search-btn" onClick={this.search}><i className="fas fa-search"></i></button>                            
                            </FormGroup>
                        </Form>
    
                        { this.state.query.length > 0 ? (<Badge onClick={this.removeSearch}>{this.state.query} x</Badge>) : '' }

                        <div className="py-4"> 
                        { this.props.isFetching && this.state.componentsLoading ? <ReactLoading className="mx-auto" type="bars" color="teal" /> :
                            this.state.hasNoSearchResult ? 'No Results' :
                            (
                                <CardColumns>

                                    {
                                        Object.keys(coins).map((k,v) => (

                                            <Card className="mx-auto" key={coins[k].id}>
                                        
                                                <Img className="card-img-over mx-auto card-img-top" src={[
                                                    `./images/${coins[k].symbol}.png`
                                                ]} />

                                                <CardBody>
                                                <CardTitle><Link to={`/coins/${coins[k].id}`}>{coins[k].name}</Link></CardTitle>
                                                <CardSubtitle>{coins[k].symbol}</CardSubtitle>
                                                <CardText>HKD {this.round(coins[k].quotes.HKD.price)} <ChangeBadge change={coins[k].quotes.HKD.percent_change_24h} /></CardText>
                                                <Link to={`/coins/${coins[k].id}`} class="btn btn--teal">Buy</Link>
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
                </div>
                </section>
        )

    }
}

const CoinList = connect((rootState) => ({
  coins: rootState.coin.coins,
  isFetching: rootState.coin.isFetching
}), (dispatch) => ({
    loadCoins: () => { dispatch(remoteFetchCoins())}
}))(PureCoinList);

export default CoinList;
