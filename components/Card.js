const Card =({ thumbnail}) => {
    return (
        <div className="thubmanilimage">
              <img className="card" src={thumbnail.url} alt={thumbnail.title} />
        </div>
    )
    
  
}

export default Card