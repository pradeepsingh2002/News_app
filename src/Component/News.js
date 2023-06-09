import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
   
    this.state = {
      articles: [ ],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsWorld - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let responce = await fetch(url);
    let data = await responce.json();
    console.log(data);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
      page: this.state.page 
    });
    this.props.setProgress(100)
  }
  
  async componentDidMount() {
    this.updateNews();
   
  }


  
  fetchMoreData = async () => {
   
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    let responce = await fetch(url);
    let data = await responce.json();
    console.log(data);
    this.setState({
      page: this.state.page + 1,
        articles: this.state.articles.concat(data.articles),
     
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "35px 0px", fontSize: "50px" }}
        >
          NewsWorld - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          {this.state.articles.length}  Headlines{" "}
        </h1>
        {this.state.loading && <Spinner />}
        {/* Infinte scroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element ,index) => {
                return (
                  <div
                    key={element.url}
                    className="col-md-4 justify-content-between"
                  >
                    <NewsItem key={index}
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : " "
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://deadline.com/wp-content/uploads/2023/06/GettyImages-1255057237.jpg?w=1024"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
       
      </>
    );
  }
}
