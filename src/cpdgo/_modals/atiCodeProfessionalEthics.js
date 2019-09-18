import React from "react";
import {Modal, Button} from 'react-bootstrap';
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player'
import axios from "axios";

class ATICodeProfessionalEthicsModal extends React.Component {
    constructor() {
        super();

        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleEnablePIP = this.handleEnablePIP.bind(this);
        this.handleDisablePIP = this.handleDisablePIP.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.ref = this.ref.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchPausedTime = this.fetchPausedTime.bind(this);

        this.state = {
            url: 'http://34.248.242.178/CPDCompliance/MyCPDMultimedia/CodeofProfessionalEthics2019.mp4',
            pip: false,
            playing: true,
            controls: true,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
        };
    }

    componentDidMount() {
        this.fetchPausedTime();
    }

    fetchPausedTime(){
        axios.get('http://34.248.242.178/CPDCompliance/api/CPDgo/GetPauseVideoTime', {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    played: data.PauseTime
                })
            }).catch(console.log);
    }

    load( url ) {
        console.log('loaded');
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    handlePlayPause(){
        this.setState({ playing: !this.state.playing })
    }

    handleStop(){
        this.setState({ url: 'http://34.248.242.178/CPDCompliance/MyCPDMultimedia/CodeofProfessionalEthics2019.mp4', playing: false })
    }

    handleToggleControls(){
        const url = this.state.url;
        this.setState({
            controls: !this.state.controls,
            url: 'http://34.248.242.178/CPDCompliance/MyCPDMultimedia/CodeofProfessionalEthics2019.mp4'
        }, () => this.load(url))
    }

    handleToggleLight(){
        this.setState({ light: !this.state.light })
    }

    handleToggleLoop(){
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange(e){
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted(){
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate(e){
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP(){
        this.setState({ pip: !this.state.pip })
    }

    handlePlay(){
        console.log('onPlay');
        this.setState({ playing: true })
    }

    handleEnablePIP(){
        console.log('onEnablePIP');
        this.setState({ pip: true })
    }

    handleDisablePIP(){
        console.log('onDisablePIP');
        this.setState({ pip: false })
    }

    handlePause(){
        console.log('onPause');
        this.setState({ playing: false });
    }

    handleSeekMouseDown(e){
        this.setState({ seeking: true })
    }

    handleSeekChange(e){
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp(e){
        this.setState({ seeking: false })
    }

    handleProgress (state) {
        console.log('onProgress', state);
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded(){
        console.log('onEnded');
        this.setState({ playing: this.state.loop })
    }

    handleDuration (duration) {
        console.log('onDuration', duration);
        this.setState({ duration })
    }

    handleClickFullscreen(){
        screenfull.request(findDOMNode(this.player))
    }

    handleClose(){
        console.log('Video is closed');
        axios.get('http://34.248.242.178/CPDCompliance/api/CPDgo/SavePauseVideoTime', {
            params: {
                pauseTime: this.state.duration * this.state.played,
            },
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.data)
            .then((data) => {
            }).catch(console.log);
    }

    ref(player) {
        this.player = player
        if(player){
            this.player.seekTo(this.state.played,'seconds')
        }
    }

    render () {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

        return (
            <Modal
                bsSize="large"
                {...this.props}
            >
              <Modal.Header closeButton className="modal-header-primary">
                <Modal.Title id="contained-modal-title-lg" >ATI Code of Professional Ethics – 1 hour course </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p >Watch this video in full and read the ATI Code of Professional Ethics. </p><br />
                  <p ><b>Note: you must watch this video in full in one sitting, you cannot exit the course and return to it at a later stage. The course will take you no longer than 1 hour to complete. Make sure to screen shot and save the final slide to use as your evidence of completion.</b></p><br />
                  <p >On completion you can then record your 1 hour of CPD. To Record follow these steps:</p><br />
                  <p >Launch MyCPD</p>
                  <p >Click Record MyCPD</p>
                  <p >Select CPDgo from drop down</p>
                  <p >Type in course title ATI Code of Professional Ethics 2019s</p>
                  <p >Select course</p>
                  <p >Upload evidence (screen shot of final slide of video)</p>
                  <p >Submit</p>

                  <div className='player-wrapper'>
                      <ReactPlayer
                          ref={this.ref}
                          className='react-player'
                          width='100%'
                          height='100%'
                          url={url}
                          pip={pip}
                          playing={playing}
                          played={played}
                          controls={controls}
                          light={light}
                          loop={loop}
                          playbackRate={playbackRate}
                          volume={volume}
                          muted={muted}
                          onReady={() => console.log('onReady')}
                          onStart={() => console.log('onStart')}
                          onPlay={this.handlePlay}
                          onEnablePIP={this.handleEnablePIP}
                          onDisablePIP={this.handleDisablePIP}
                          onPause={this.handlePause}
                          onBuffer={() => console.log('onBuffer')}
                          onSeek={e => console.log('onSeek', e)}
                          onEnded={this.handleEnded}
                          onError={e => console.log('onError', e)}
                          onProgress={this.handleProgress}
                          onDuration={this.handleDuration}
                      />
                  </div>

              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-warning" onClick={()=>{ this.handleClose(); this.props.onHide() }}>Close</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}

export default ATICodeProfessionalEthicsModal;