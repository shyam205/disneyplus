import { gql, GraphQLClient } from "graphql-request";
import { useState } from 'react';
import Link from 'next/link'

export const getServerSideProps = async (pageContext) => {

    const url = process.env.END_POINT;
    const graphQLClient = new GraphQLClient(url, {
        headers:{
        "Authorization":process.env.GRAPH_CMS_TOKEN,
        //"content-Type":"application/json"
        }
    })

    //console.log("pagecount",pageContext);
    const pageSlug = pageContext.query.slug;

    const query = gql`
    query($pageSlug:String!) {
        video(where: {
          slug: $pageSlug
        }) {
          createdAt,
          id,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail {
            url
          },
          mp4 {
            url
          }
        }
      }
    `

    const variables = {
        pageSlug
    }

    const data  = await graphQLClient.request(query,variables);
    const video = data.video;
    
    return{
        props:{
            video
        }
    }
}

const changeToSeen = async (slug) => {
    await fetch('/api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug })
    })
}

const Video = ({ video }) => {
    const [watching, setWatching] = useState(false);
    
     return(
        
        <div className="video-player">
        
            {!watching && <img className="video-image" src={video?.thumbnail.url} alt={video.title}/>}
            {!watching && <div className="info">
                <h2>{video.title}</h2>
                <h3>{video.tags.join(', ')}</h3>
                <p>{video.description}</p>
                <Link href="/">go back</Link>
                <button
                    className="video-overlay"
                    onClick={() => {
                        changeToSeen(video.slug)
                        watching ? setWatching(false): setWatching(true)
                    }}
                >PLAY</button>
            </div>}
            {watching && (
                <video width="100%" controls>
                    <source src={video.mp4.url} type="video/mp4"/>
                </video>
            )}
            <div className="info-footer"
                 onClick={() => watching ? setWatching(false) : null}
            ></div>
        </div>
    )
}

export default Video;