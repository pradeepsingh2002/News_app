import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date ,source} = this.props;
    return (
      <div className="containe"> 
        <div className="card ">
        
          <img
            src={imageUrl}
            style={{ height: "240px" }}
            className="card-img-top mt-2 m-auto"
            alt="..."
          />
          
          <div className="card-body">
           
            <h5 className="card-title">
              {title }
            </h5> 
            <p className="badge text-bg-danger" style={{}}>Source: {source}</p>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "unknown" : author} on
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
