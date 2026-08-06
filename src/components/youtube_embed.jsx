export default function YoutubeEmbed(props) {
    return (<div className="m-4">
    <iframe width="280" height="158" src={`https://www.youtube.com/embed/${props.id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </div>)
}
