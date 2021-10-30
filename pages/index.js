import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import marked from 'marked'


const matter= require('gray-matter')

export default function Home({posts}) {
console.log(posts.map(data=>data))
  return (
    <div className={styles.container}>
      <Head><title>markdown</title></Head>
      {
        posts.map(data=><div key={data.slug}>
        <div  dangerouslySetInnerHTML={{ __html: marked(data.content) }}></div>
        
        <h1>{data.frontmatter.title}</h1>
        <Image 
        src={data.frontmatter.cover_image}
        alt="image"
        height={300}
        width={200}
        ></Image>
        </div>
        
        
        )


      }
  
    </div>
  )
}
 export async function getStaticProps(){
  const files=fs.readdirSync(path.join('posts'))
  console.log('files',files)
  //Get slug and front-matter from post

  const posts=files.map((filename)=>{
    //get slug
    const slug= filename.replace('.md','')
    console.log(slug)
    //get front-matter
    const markedDataWithFrontMatter = fs.readFileSync(path.join('posts',filename),'utf-8')
  const dataContent= matter(markedDataWithFrontMatter)
  console.log(dataContent)
    
  const {data:frontmatter,content} = matter(markedDataWithFrontMatter)
   
    return{
      slug,
     frontmatter,
     content
     
    
    }
  })

  
   return {
     props:{ 
       posts:posts,
      }
    }
   }
 