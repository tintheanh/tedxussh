import React from 'react';
import Pagination from 'react-paginating';
import { Link } from 'react-router-dom';
import { modifyObj } from '../../../config/functions';

class PostSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.getUserPath(window.location.href)
		};
	}

	handlePageChange = (page, e) => {
		this.setState({ currentPage: page });
	};

	getUserPath(href) {
		const n = href.lastIndexOf('/');
		const result = href.substring(n + 1);
		return isNaN(parseInt(result)) ? 1 : parseInt(result);
	}

	handlePageChange = (page, e) => {
		this.setState({ currentPage: page });
	};

	renderItems(postList, currentPage) {
		if (postList) {
			return (
				postList[0] &&
				postList[currentPage - 1].map(item => (
					<Link to={`/learn/?post=${item.id}`} className="col-md-12 col-lg-4 mb-2" key={item.id}>
						<div className="hotel-room text-center notransition">
							<div className="media-with-text">
								<div className="img-border-sm mb-4">
									<img src={item.thumbnail} alt="" className="img-fluid notransition" />
								</div>
								<h2 className="" style={{ fontFamily: 'Oswald', textAlign: 'left' }}>
									{item.title}
								</h2>

								<span
									className="mb-3 d-block post-date"
									style={{
										fontFamily: 'Montserrat',
										fontWeight: '500',
										textAlign: 'left'
									}}
								>
									{item.description}
								</span>
								<span
									className="mb-3 d-block post-date"
									style={{
										paddingBottom: '12px',
										fontFamily: 'Montserrat',
										fontWeight: '500',
										textAlign: 'left'
									}}
								>
									By {item.by}
								</span>
							</div>
						</div>
					</Link>
				))
			);
		}
		return null;
	}

	render() {
		const { isVN } = this.props;
		const { currentPage } = this.state;
    const postSection = modifyObj(isVN, this.props.postSection, 'post');
		const { header, postList } = postSection;
		const limit = 6;
		const pageCount = 6;
		const total = postList.length * limit;
		if (this.getUserPath(window.location.href) <= postList.length) {
			return (
				<div>
					<div className="row" style={{ width: '100%', margin: '0' }}>
						<div className="col-sm-6 mx-auto text-center mb-5 section-heading">
							<h2 className="mb-5">Blog</h2>
							<p style={{ fontFamily: 'Montserrat', paddingBottom: '24px' }}>{header}</p>
						</div>
					</div>
					<div className="row">{this.renderItems(postList, currentPage)}</div>
					<Pagination total={total} limit={limit} pageCount={pageCount} currentPage={currentPage}>
						{({
							pages,
							currentPage,
							hasNextPage,
							hasPreviousPage,
							previousPage,
							nextPage,
							totalPages,
							getPageItemProps
						}) => (
							<div className="row mt-5" style={{ width: '100%' }}>
								<div className="col-md-12 text-center">
									<div className="learn-pagination">
										<Link to={`/learn/1`}>
											<span
												{...getPageItemProps({
													pageValue: 1,
													onPageChange: this.handlePageChange
												})}
											>
												first
											</span>
										</Link>

										{hasPreviousPage && (
											<Link to={`/learn/${previousPage}`}>
												<span
													{...getPageItemProps({
														pageValue: previousPage,
														onPageChange: this.handlePageChange
													})}
												>
													{'<'}
												</span>
											</Link>
										)}

										{pages.map((page, i) => {
											let activePage = null;
											if (currentPage === page) {
												activePage = {
													backgroundColor: '#f23a2e',
													color: '#fff'
												};
											}
											return (
												<Link key={i} to={`/learn/${page}`}>
													<span
														{...getPageItemProps({
															pageValue: page,
															key: page,
															style: activePage,
															onPageChange: this.handlePageChange
														})}
													>
														{page}
													</span>
												</Link>
											);
										})}

										{hasNextPage && (
											<Link to={`/learn/${nextPage}`}>
												<span
													{...getPageItemProps({
														pageValue: nextPage,
														onPageChange: this.handlePageChange
													})}
												>
													{'>'}
												</span>
											</Link>
										)}
										<Link to={`/learn/${totalPages}`}>
											<span
												{...getPageItemProps({
													pageValue: totalPages,
													onPageChange: this.handlePageChange
												})}
											>
												last
											</span>
										</Link>
									</div>
								</div>
							</div>
						)}
					</Pagination>
				</div>
			);
		}
		return null;
	}
}

export default PostSection;
