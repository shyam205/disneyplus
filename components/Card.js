import Image from 'next/Image';
import Link from 'next/link'

const Card =({ video }) => {
    return (
        <div className="thubmanilimage">
             <Link href={`/video/${video.slug}`} ><Image className="card" src={video.thumbnail.url} alt={video.thumbnail.title} height={125} width={170} /></Link>
        </div>
    )
    
  
}

export default Card