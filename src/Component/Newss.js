import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";


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
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsWorld - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

   async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=996b5bbf9dda4a999bfbe334dab28631&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let responce = await fetch(url);
    let data = await responce.json();
  
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    console.log("hello i am runing")
    this.updateNews();
  }

  handlePreviousClick = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=business&category=${
      this.props.category
    }&apiKey=996b5bbf9dda4a999bfbe334dab28631&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let responce = await fetch(url);
    let data = await responce.json();
    this.setState({articles: data.articles,
      page: this.state.page - 1,
      loading: false,
    });

    this.setState({ page: this.state.page + 1 });
  };

  handleNextClick = async () => {
    
    if (!(this.state.page + 1 >Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=business&category=${
        this.props.category
      }&apiKey=996b5bbf9dda4a999bfbe334dab28631&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let responce = await fetch(url);
      let data = await responce.json();
   

      this.setState({
        page: this.state.page + 1,
        articles: data.articles,
        loading: false,
      });
    }
  };

  // fetchMoreData = async () => {
  //   console.log(this.state.page);
  //   this.setState({ page: this.state.page + 1 });
  //   console.log(this.state.page);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=996b5bbf9dda4a999bfbe334dab28631&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let responce = await fetch(url);
  //   let data = await responce.json();
  //   console.log(data);
  //   this.setState({
  //     articles: this.state.articles.concat(data.articles),
  //     totalarticles: data.totalResults,
  //     loading: false,
  //   });
  // };

  render() {
  
    return (
      <div className="container">
        <h1
          className="text-center"
          style={{ margin: "35px 0px", fontSize: "50px" }}
        >
          NewsWorld - Top {this.state.articles.length}{" "}
          {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {/* Infinte scroll */}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        > */}

        {/* <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div
                key={element.url}
                className="col-md-4 justify-content-between"
              >
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : " "
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
        </div> */}
        {/* </InfiniteScroll> */}
        <div className="row">
        {!this.state.loading &&
          this.state.articles.map((element) => {
            return (
              <div
                key={element.url}
                className="col-md-4 justify-content-between"
              >
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : " "
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
          })} </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark my-3"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalReslults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark my-3"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
