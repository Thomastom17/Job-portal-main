import React from 'react'
import Slider from "react-slick";
import starIcon from '../assets/Star_icon.png'
import left from '../assets/left_arrow.png'
import right from '../assets/right_arrow.png'
import { useNavigate } from "react-router-dom";
import { CompaniesList } from "../CompaniesList";

/* Below Code is removed after backend integration*/
const findbyCompaniesNameList = CompaniesList.slice(0,8)

export const Jobsbycompany = () => {
    const navigate = useNavigate();
    const CustomPrevArrow = ({ onClick }) => (
        <div className="custom-arrow prev" onClick={onClick}>
            <img src={left} alt="Previous" />
        </div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div className="custom-arrow next" onClick={onClick}>
            <img src={right} alt="Next" />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };
    return (
        <section className="carousel-wrapper">
            <h2 className="carousel-title">Find Jobs By Company</h2>
            <Slider {...settings}>
                {findbyCompaniesNameList.map((company) => (
                    <div className="carousel-card" key={company.companyId}>
                        <img className="carousel-company-logo" src={company.logo} alt={company.companyName} />
                        <div className="carousel-card-header">
                            <h3>{company.companyName}</h3>
                            <p className='carousel-company-rating'><span className="star"><img src={starIcon} /></span> {company.ratings} | {company.reviewNo} reviews</p>
                        </div>
                        <p className="carousel-desc">{company.slogan}</p>
                        <button onClick={()=>navigate(`/Job-portal/jobseeker/companies/${company.companyId}`)} className="carousel-view-jobs">View jobs</button>
                    </div>
                ))}
            </Slider>
            <div className="carousel-view-all-wrapper">
                <button onClick={() => navigate('/Job-portal/jobseeker/companies')} className="carousel-view-all">View All Companies</button>
            </div>
        </section>
    )
}
