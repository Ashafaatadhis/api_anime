const { searchAnime, listAnime, getAnime } = require("../libs/kusonime");

const KusonimeController = async (req, res) => {
  //   fs.writeFileSync("apa/kover.html", $(".venutama .kover").html());
  //   console.log(req.params.anime);

  const hasilAnime = await searchAnime(req.params.anime);
  const hasilList = await listAnime(hasilAnime);

  //   ingat ini
  if (!hasilList.length) {
    res.status(400).json({ msg: "Anime not resolved" });
    return;
  }
  const linkGan = hasilList[0].split(" : ")[1];
  const hasil = await getAnime(linkGan);
  // const { info, link } = await getAnime(linkGan);
  res.json(hasil);
  // res.status(200).json({ info, link });
};

module.exports = KusonimeController;
