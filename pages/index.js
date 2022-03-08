import { gql, GraphQLClient } from "graphql-request";
import Link from 'next/Link'
import Image from 'next/Image'
import NavBar from "../components/NavBar";
import Section from "../components/Section";
import Heroslider from "../components/Heroslider";
import disneyLogo from '../public/disney-button.png'
import marvelLogo from '../public/marvel-button.png'
import natgeoLogo from '../public/natgeo-button.png'
import starwarsLogo from '../public/star-wars-button.png'
import pixarLogo from '../public/pixar.png'

export const getStaticProps = async () => {
  const url = process.env.END_POINT;
  const graphQLClient = new GraphQLClient(url, {
    headers:{
      "Authorization":process.env.GRAPH_CMS_TOKEN
    }
  })

  const query = gql`
      query{
        videos{
          createdAt,
          id,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail{
            url
          },
          mp4{
            url
          }
        }
      }
      `

      const accountQuery = gql`
      query {
      account(where: { id: "cl0dsvu9v17m00bpnr6y2uvx8"}) {
        username
        avatar {
          url
        }
      }
    }
    `


      const data = await graphQLClient.request(query);
     
      const videos = data.videos;
    
      const accountData = await graphQLClient.request(accountQuery)
      const account = accountData.account

      return{
        props:{
            videos,
            account
        }
      }
}


export default function Home({ videos, account }) {
  //console.log(videos);

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
   }

   const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
}

  return (
    <div className="app">
      <NavBar account={account} />
      <div className="main-video">
        <Heroslider videos={videos} />
        {/* <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} />   */}
      </div>
      <div className="video-feed">
      <div className="video-feed-logo">
                    <Link href="#disney">
                        <div className="franchise" id="disney">
                            <Image src={disneyLogo}/>
                        </div>
                    </Link>
                    <Link href="#pixar">
                        <div className="franchise" id="pixar">
                            <Image src={pixarLogo}/>
                        </div>
                    </Link>
                    <Link href="#star-wars">
                        <div className="franchise" id="star-wars">
                            <Image src={starwarsLogo}/>
                        </div>
                    </Link>
                    <Link href="#nat-geo">
                        <div className="franchise" id="nat-geo">
                            <Image src={natgeoLogo}/>
                        </div>
                    </Link>
                    <Link href="#marvel">
                        <div className="franchise" id="marvel">
                            <Image src={marvelLogo}/>
                        </div>
                    </Link>
                </div>
      <Section genre={'Recommended for you'} videos={unSeenVideos(videos)}/>
        <Section genre={'Family'} videos={filterVideos(videos, 'family')} /> 
        <Section genre={'thriller'} videos={filterVideos(videos, 'thriller')} />
        <Section genre={'classic'} videos={filterVideos(videos, 'classic')} />
        <Section genre={'Pixer'} videos={filterVideos(videos, 'family')} /> 
        <Section genre={'Marvel'} videos={filterVideos(videos, 'thriller')} /> 
        <Section genre={'Disney'} videos={filterVideos(videos, 'disney')} /> 
        <Section genre={'Star Wars'} videos={filterVideos(videos, 'star-wars')} /> 
      </div>
    </div>
  )
}
