import { MagicCard } from "./magicui/magic-card"
import BlurFade from "./magicui/blur-fade"
import HyperText from "./magicui/hyper-text"
import HeroVideoDialog from "./magicui/hero-video-dialog"
import { Button } from "@/components/ui/button"
import BoxReveal from "./magicui/box-reveal"

const Hero = () => {
  return (
    <div className="p-20">
          <BlurFade  delay={0.25 } inView>
              <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="md:w-[80%]">
                      <MagicCard
                          className="cursor-pointer text-white bg-[#000000ed] border-0 
                  "
                          gradientColor={"white"}
                      >
                          <div className="flex flex-col gap-8  p-4">
                              <HyperText className="text-4xl" text={"CTR PRO"} />
                              
                              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                                  <p className="p-4 text-3xl tracking-wide">
                                      Your one stop to analyse thumbnails that people like.
                                    Just upload the variety of thumbnails you have and we will tell you which one is the best.
                                    <br/>
                                    Trusted by over 1000+ creators.
                                  </p>
                              </BoxReveal>
                              
                              <div className="w-full flex">
                                  <Button variant={"secondary"} className="w-40">Get Started</Button>
                                  
                              </div>
                          </div>

                      </MagicCard>
                  </div>
                  <div>
                      <HeroVideoDialog
                          className="dark:block"
                          animationStyle="from-center"
                          videoSrc="https://www.youtube.com/embed/zjqWawzmN4Y"
                          thumbnailSrc="/images/stl.png"
                          thumbnailAlt="Hero Video"
                      />
                  </div>
                  
              </div>
          </BlurFade>
          
          
          <section id="services" className="mt-5">
                <div className="flex flex-col gap-4">
                    
                    <HyperText className="text-4xl text-center" text={"Services"} />
                    <div className="flex flex-col md:flex-row gap-8">
                    
                      <MagicCard className="bg-[#19191778] text-white border-0 h-full min-h-[228px]">
                          <div className="p-4">
                              <HyperText className="text-3xl" text={"A/B Testing"} />
                              <p className="text-xl p-4">
                                  Test your thumbnails with real people.
                                  Know which thumbnail is the best.
                                  Get more views and subscribers.
                              </p>
                          </div>
                      </MagicCard>
                      <MagicCard className="bg-[#19191778] text-white border-0 h-full min-h-[228px]">
                            <div className="p-4">
                                <HyperText className="text-3xl" text={"Thumbnail Analysis"} />
                                <p className="text-xl p-4">
                                    Get detailed analysis of your thumbnails.
                                    Know what people like and what they don't.
                                    Improve your CTR and get more views.
                                </p>
                            </div>
                        </MagicCard>
                      
                      <MagicCard className="bg-[#19191778] text-white border-0 min-h-[228px]">
                          <div className="p-4">
                              <HyperText className="text-3xl" text={"Get Paid to review"} />
                              <p className="text-xl p-4">
                                  Get paid to review thumbnails.
                                  Help creators improve their CTR.
                                  Get paid for your time.
                              </p>
                          </div>
                      </MagicCard>
                    </div>
                </div>
          </section>
          
    </div>
  )
}
export default Hero

/*
<section className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">Why CTR PRO?</h2>
                    <p className="text-xl">
                        CTR PRO is a tool that helps you analyse thumbnails that people like.
                        <br />
                        Just upload the variety of thumbnails you have and we will tell you which one is the best.
                        <br />
                        Trusted by over 1000+ creators.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">How it works?</h2>
                    <p className="text-xl">
                        CTR PRO is a tool that helps you analyse thumbnails that people like.
                        <br />
                        Just upload the variety of thumbnails you have and we will tell you which one is the best.
                        <br />
                        Trusted by over 1000+ creators.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">What are the benefits?</h2>
                    <p className="text-xl">
                        CTR PRO is a tool that helps you analyse thumbnails that people like.
                        <br />
                        Just upload the variety of thumbnails you have and we will tell you which one is the best.
                        <br />
                        Trusted by over 1000+ creators.
                    </p>
                </div>
            </section>
*/ 