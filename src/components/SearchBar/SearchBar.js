import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = { term: '', location: '', sortBy: 'best_match' };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
    }

    getSortByClass(sortByOption){
        return this.state.sortBy == sortByOption ? 'active' : '';
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy: sortByOption
        },() => {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy); //handles search upon changing sort by option
        });
    }

    handleTermChange(event){
        this.setState({term: event.target.value});
    }

    handleLocationChange(event){
        this.setState({location: event.target.value});
    }

    handleKeyDown(event){
        if(event.keyCode === 13){
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            event.preventDefault(); //prevents the default action of clicking a link from triggering at the end of the method
        }
    }

    handleSearch(event){ //prints message with search parameters when let's go button is clicked
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault(); //prevents the default action of clicking a link from triggering at the end of the method
    }

    renderSortByOptions(){ //dynamically creates list items needed to display sort options
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return(<li 
                key={sortByOptionValue}
                onClick={this.handleSortByChange.bind(this,sortByOptionValue)} //binds the current value of this and binds the current sortByOptionValue
                className={this.getSortByClass(sortByOptionValue)}>
                {sortByOption}</li> //styles sort by option, displays to user current selected sort
            );
        });
    }

    render(){
        return(
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} onKeyDown={this.handleKeyDown} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} onKeyDown={this.handleKeyDown} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;
