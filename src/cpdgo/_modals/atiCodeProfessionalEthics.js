import React from "react";
import {Modal, Button} from 'react-bootstrap';
import VideoPlayer from 'react-video-markers';

import ReactPlayer from 'react-player'


class ATICodeProfessionalEthicsModal extends React.Component {
    constructor() {
        super();

        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleVolume = this.handleVolume.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleEnablePIP = this.handleEnablePIP.bind(this);
        this.handleDisablePIP = this.handleDisablePIP.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleEnded = this.handleEnded.bind(this);

        this.state = {
            isPlaying: false,
            time: 0,
            volume: 0.7,
            url: null,
            pip: false,
            playing: true,
            controls: true,
            light: false,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false
        };
    }

    handlePlay () {
        this.setState({isPlaying: true});
    };

    handlePause(event){
        console.log(event);
        console.log(event.timeStamp);
        console.log(event.timeStamp/3600);
        this.setState({isPlaying: false});
    };

    handleVolume(value){
        this.setState({volume: value});
    };

    handleDuration(duration){
        console.log('onDuration', duration)
    };

    handleEnablePIP () {
        console.log('onEnablePIP')
        this.setState({ pip: true })
    }

    handleDisablePIP() {
        console.log('onDisablePIP')
        this.setState({ pip: false })
    }

    handleProgress(state) {
        console.log('onProgress', state.playedSeconds)

        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded(){
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }


    render () {

        const { isPlaying, url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

        return (
            <Modal
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
                          url="http://34.248.242.178/CPDCompliance/MyCPDMultimedia/CodeofProfessionalEthics2019.mp4"
                          pip={true}
                          playing={isPlaying}
                          controls={controls}
                          volume={volume}
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
                <Button className="btn btn-warning" onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}

export default ATICodeProfessionalEthicsModal;