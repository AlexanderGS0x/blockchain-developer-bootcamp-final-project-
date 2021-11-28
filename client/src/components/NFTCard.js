export const NFTCard = (nft, children) => {
  return (
    <div className="grid-item" id={nft.tokenId}>
      <div className="header">
        <img src={nft.src} alt={nft.title} />
      </div>
      <div className="footer">
        <div className="info">
          <h3>{nft.title}</h3>
          <p>{nft.price}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
