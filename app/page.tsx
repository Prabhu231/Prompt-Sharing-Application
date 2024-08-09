import Feed from "@components/Feed"

async function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share 
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>
      <p className="text-center desc">
        Promptopia is a modern AI prompt tool to discover and share creative prompts
      </p>
      <Feed />
    </section>
  )
}

export default Home