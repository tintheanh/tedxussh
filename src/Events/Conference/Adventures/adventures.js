import React from 'react';

const renderImg = (totalRows, imgs) => {
  let startIndex = -4;
  let endIndex = startIndex + 4;
  const temp = Array.from({ length: totalRows }, () =>
    Math.floor(Math.random())
  );

  return temp.map((_, i) => {
    startIndex += 4;
    endIndex += 4;
    return (
      <div className="row adventures-section" key={i}>
        {renderRow(startIndex, endIndex, imgs)}
      </div>
    );
  });
};

const renderRow = (startIndex, endIndex, imgs) => {
  return imgs.slice(startIndex, endIndex).map(e => (
    <div className="col-sm-6 col-lg-3 mb-2 adventure" key={e.id}>
      <div
        className="hotel-room text-center notransition"
        style={{ background: 'transparent' }}
      >
        <div className="d-block mb-0 thumbnail notransition">
          <img src={e.picture} alt="" className="img-fluid notransition" />
        </div>
      </div>
      <div className="hotel-room-body text-center">
        <p style={{ fontWeight: 700, marginBottom: '6px' }}>{e.name}</p>
        <p>{e.detail}</p>
      </div>
    </div>
  ));
};

const renderAllImg = imgs => {
  if (imgs.length > 0) {
    if (imgs.length % 4 === 0) {
      return renderImg(imgs.length / 4, imgs);
    }
    return renderImg(imgs.length / 4 + 1, imgs);
  }
  return <h2>No imgs available</h2>;
};

const Adventures = props => {
  const { adventures, adventureHeader, adventureDesc } = props;
  return (
    <div className="site-section bg-white">
      <div className="container">
        <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
          <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
            Adventures
          </h2>
        </div>
        <div className="row adv-wrapper">
          <div className="col-12">
            <h1
              className="text-center"
              style={{
                textTransform: 'uppercase',
                fontWeight: '500',
                fontSize: '24px'
              }}
            >
              {adventureHeader}
            </h1>
          </div>
        </div>
        <div className="row adv-wrapper" style={{ paddingBottom: '24px' }}>
          <div className="col-12">
            {/* <p className="text-center adv-desc">{adventureDesc}</p> */}
            <div
              className="text-center adv-desc"
              dangerouslySetInnerHTML={{ __html: adventureDesc }}
            />
          </div>
        </div>
        <div className="row">{renderAllImg(adventures)}</div>
      </div>
    </div>
  );
};

export default Adventures;
