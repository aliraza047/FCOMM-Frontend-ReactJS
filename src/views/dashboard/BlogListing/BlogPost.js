import React from 'react';
import Button from '@mui/material/Button';
export default function BlogPost() {
    return (
        <div className="blogpost">
            <div className="heading">
                <h2>Blog Post</h2>
            </div>
            <div className="blog">
                <div className="getting-ahead">
                    <div className="heading">
                        <h2>Getting ahead with AI for business – Insights from a future AI business consultant</h2>
                    </div>
                    <p>
                        Posted on <span> 12 Aug 2021</span> by <span> Calen Legaspi</span>
                    </p>
                </div>
                <p>
                    Francisco Palavecino graduated from Hyper Island’s Business Developer program in 2019. He moved to Amsterdam to start a
                    new life as a Digital Transformation Designer. Yet just a few months later, now in 2020, he found himself applying to
                    our brand-new AI Business Consultant program. For the second time, Francisco received a message of acceptance and began
                    a fresh journey on the Island, only this time, the world was a very different place. Here we discover why he made this
                    decision and his unique views on AI in the world of business.
                </p>

                <div className="heading">
                    <h2>The journey to AI business consultancy</h2>
                    <p>
                        Since leaving my native Chile 20 years ago after completing my degree in Business Administration, I have lived and
                        worked in multiple cities including London, Barcelona, Bergen, Stockholm, and Amsterdam. This experience shaped me
                        on so many levels; not only have I developed a more cultural awareness and learned more about the importance of
                        diversity, but I’ve also gained a global mindset, which I have applied every single day.
                    </p>
                    <p>
                        In 2019, after completing my studies on Hyper Island’s Business Developer program, I moved to Amsterdam to work as a
                        Digital Transformation Designer at Digital Society School. I worked on an interesting project promoting innovation
                        and digital transformation for the forensic mental healthcare facilities in the Netherlands, using new technologies
                        related with AI. When COVID-19 was declared a pandemic, I had to come back to Stockholm—leaving everything behind.
                        The good news was that I’d heard about the new Hyper Island AI Business Consultant program. It was a perfect
                        opportunity for me to dig deeper, train myself, and get more robust knowledge on the topics that I got so into when
                        I was in Amsterdam.
                    </p>
                </div>

                <div className="heading">
                    <h2>The approach to AI post Hyper Island</h2>
                    <p>
                        I have no doubt that studying at Hyper Island will give you a competitive advantage. During my first stint at Hyper
                        Island, I gained tons of tools and experiences to be able to understand team dynamics and how to manage processes,
                        culture creation, and run a business idea. Combined with the new program, I’m finding myself bridging the gap
                        between tech and business by using my knowledge of AI alongside my entrepreneur skills.
                    </p>
                    <p>
                        Studying at Hyper Island changed in how I embrace failure in a healthy way. After my time on the Business Developer
                        program, I learned that failure is a critical element of success. Every failure brings you one step closer to
                        success, as long as you learn from it.
                    </p>
                </div>

                <div className="note">
                    <p>“It’s only a failure when we fail to rise again after a fall.”</p>
                </div>
            </div>

            <div className="col-md-4 mx-auto">

            <div className="approval">
                <p>This post needs approval from you</p>
            <div className="rejected-btn d-flex ">
                        <Button variant="contained" className="rejectedbtn">
                        Rejected
                        </Button>
                        <Button variant="contained" className="approvebtn">
                        Approve
                        </Button>
                    </div>
        </div>
        </div>
        </div>
    );
}
