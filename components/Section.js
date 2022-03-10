import Link from 'next/link'
import Card from './Card';

const Section = ({genre, videos}) => {
    
    return(
        <div className='section'>
            <h3>{genre}</h3>
            <div className='video-feed-section-container'>
            <div className='video-feed-section'>
                    {videos?.map(video => (
                        <Link key={video.id} href={`/video/${video.slug}`}>
                            <Card video={video} />
                        </Link>
                        
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Section;