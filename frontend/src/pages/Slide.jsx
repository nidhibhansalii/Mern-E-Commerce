import { Divider, Box, Typography, Button, styled, Container } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import Countdown from 'react-countdown';

const Slide = ({ products, timer, title }) => {
    const navigate = useNavigate()

    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return <RenderTimer variant="span">
            {hours} : {minutes} : {seconds}  Left
        </RenderTimer>;
    };

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    timer &&
                    <Timer>
                        <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                }
                <ViewAllButton
                    variant="contained"
                    onClick={() => { navigate("/Products") }}
                >
                    View All
                </ViewAllButton>
            </Deal>

            <Divider />

            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                {
                    products.map((product, index) => (
                        <Link key={index} to={`/product/view/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Box textAlign="center" style={{ padding: '25px 15px' }}>
                                <Image src={product.productImage} />
                                <Text style={{ fontWeight: 600, color: '#212121' }}>{product.productName}</Text>
                                <TextContainer>
                                    <Text style={{ color: '#525050', textDecoration: "line-through" }}>{product.price.mrp}</Text>
                                    <Text>₹{product.price.cost}</Text>
                                    <Text style={{ color: 'green' }}>{product.price.discountPercent}</Text>
                                </TextContainer>
                                <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
                            </Box>
                        </Link>
                    ))
                }
            </Carousel>
        </Component>
    )
}

export default Slide;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #4d1c9c;
    border-radius: 2px;
    font-size: 13px;
    &:hover {
      background-color: #7a1ccb;
    }
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
})

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`

const TextContainer = styled(Container)`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin: 8px;
`;

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));