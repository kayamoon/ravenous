import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = { term: '', location: '', sortBy: 'best_match' };
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
        this.setState( {sortBy: sortByOption} );
    }

    renderSortByOptions(){ //dynamically creates list items needed to display sort options
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li 
                onClick={this.handleSortByChange.bind(this,sortByOptionValue)} //binds the current value of this and binds the current sortByOptionValue
                key="{sortByOptionValue}" 
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
                    <input placeholder="Search Businesses" />
                    <input placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;
