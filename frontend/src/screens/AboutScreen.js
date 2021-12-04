import React from 'react'
import { Container, Button } from 'react-bootstrap'

const AboutScreen = () => {
    return (
        <>
            <Container>
                <div>
                <div class="card text-center">
                    <div class="card-header">
                        <h1 className='display-6'>BidHunter</h1>
                    </div>
                    <div className="card-body">
                        <p className="card-text legend">
                            What is bidding?<br />

                            The Offering of prices for something, especially at an auction.<br />

                            A Bid is generally a process that an agency takes up in order to purchase
                            services (or) technologies from vendors.<br />

                            <br />Basic terminologies in bidding :

                            Auction
                            Auctioneer
                            bid
                            bid caller 
                            bid history
                            bid increment 
                            bidder
                            starting price 
                            bid time 
                                    We as a team want to implement this business system so that one can access bids 
                            from nowhere to anywhere. One can bid for any product without actually 
                            being there.<br />
                                    We had written a linkedin article regarding our business system which 
                            has survey form ,insights ,interviews ,user personas ,tools.<br /> 

                                    We have created login,logout pages and user interfaces using react and
                            other components .<br />
                                    
                                    This business system enables us to continue bidding without any third 
                            party being there.<br />
                                    
                                    We have also created payment gateway " <b>reckz coins</b> " which need to 
                            be acquired using real money which will reflect as reckz coins in user 
                            profile . One can bid for any product using these reckz coins.<br /></p><br /><br />
                            <figure>
                                <figcaption class="blockquote-footer">
                                    * Spare a few minutes to help us improve by clicking the button below that redirects to the Feedback Form
                                </figcaption>
                        </figure>
                        <Button className="btn btn-primary" href="https://forms.office.com/Pages/ResponsePage.aspx?id=PsiMgEal50egP3Oh67ok80H4kI1c4EhNtm-NHJ7Yb4tUOUYyM1hCOFBHSVdXRU1PVUhMTlRWUThWOS4u">
                            Feedback Form
                        </Button>
                    </div>
                </div>
                </div>
            </Container>
        </>
    )
}

export default AboutScreen
