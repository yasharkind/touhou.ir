export default function YoutubeEmbed(props) {
    return (<div key={props.key} className="m-4">
    <iframe key={`${props.key}1`} width="280" height="158" src={`https://www.youtube.com/embed/${props.id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </div>)
}
