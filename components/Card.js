import Image from 'next/Image'

const Card =({ thumbnail}) => {
    return (
        <div className="thubmanilimage">
              <Image className="card" src={thumbnail.url} alt={thumbnail.title} />
        </div>
    )
    
  
}

export default Card