/**
 * This is the cast.framework namespace.
 */
declare namespace cast.framework {
    /**
     * The possible states of the receiver active-input.
     */
    enum ActiveInputState {
        /**
         * Indicates that it is not known (and/or not possible to know) whether the Google cast device is the currently active video input. Active input state can only be reported when the Google cast device is connected to a TV or AVR with CEC support.
         */
        ACTIVE_INPUT_STATE_UNKNOWN,
        /**
         * Indicates that the Google cast device is not the currently active video input.
         */
        ACTIVE_INPUT_STATE_NO,
        /**
         * Indicates that the Google cast device is the currently active video input.
         */
        ACTIVE_INPUT_STATE_YES,
    }
    /**
     * The events that cast.framework.CastContext supports.
     */
    enum CastContextEventType {
        /**
         * Event to track cast icon state. Event data is of type cast.framework.CastStateEventData.
         */
        CAST_STATE_CHANGED,
        /**
         * Event to track current cast session. Event data is of type cast.framework.SessionStateEventData.
         */
        SESSION_STATE_CHANGED,
    }
    /**
     * The possible casting states.
     */
    enum CastState {
        /**
         * No cast devices are available.
         */
        NO_DEVICES_AVAILABLE,
        /**
         * Cast devices are available, but a cast session is not established.
         */
        NOT_CONNECTED,
        /**
         * Cast session is being established.
         */
        CONNECTING,
        /**
         * Cast session is established.
         */
        CONNECTED,
    }
    /**
     * Logging levels for cast framework.
     */
    enum LoggerLevel {
        /**
         * Debug logging (all messages).
         */
        DEBUG,
        /**
         * Info logging (events, general logs).
         */
        INFO,
        /**
         * warning logging (warnings).
         */
        WARNING,
        /**
         * Error logging (errors).
         */
        ERROR,
        /**
         * No logging.
         */
        NONE,
    }
    /**
     * Event types for changes of cast.framework.RemotePlayer data.
     */
    enum RemotePlayerEventType {
        /**
         * Any property has changed. Useful for an Angular binding application, where angular needs to be notified everytime a property is changed.
         */
        ANY_CHANGE,
        /**
         * Property isConnected has changed.
         */
        IS_CONNECTED_CHANGED,
        /**
         * Property isMediaLoaded has changed.
         */
        IS_MEDIA_LOADED_CHANGED,
        /**
         * Property duration has changed.
         */
        DURATION_CHANGED,
        /**
         * Property currentTime has changed.
         */
        CURRENT_TIME_CHANGED,
        /**
         * Property isPaused has changed.
         */
        IS_PAUSED_CHANGED,
        /**
         * Property volumeLevel has changed.
         */
        VOLUME_LEVEL_CHANGED,
        /**
         * Property isMuted has changed.
         */
        IS_MUTED_CHANGED,
        /**
         * Property canPause has changed.
         */
        CAN_PAUSE_CHANGED,
        /**
         * Property canSeek has changed.
         */
        CAN_SEEK_CHANGED,
        /**
         * Property displayName has changed.
         */
        DISPLAY_NAME_CHANGED,
        /**
         * Property statusText has changed.
         */
        STATUS_TEXT_CHANGED,
        /**
         * Property title has changed.
         */
        TITLE_CHANGED,
        /**
         * Property displayStatus has changed.
         */
        DISPLAY_STATUS_CHANGED,
        /**
         * Property mediaInfo has changed.
         */
        MEDIA_INFO_CHANGED,
        /**
         * Property imageUrl has changed.
         */
        IMAGE_URL_CHANGED,
        /**
         * Property playerState has changed.
         */
        PLAYER_STATE_CHANGED,
    }
    /**
     * The events that cast.framework.CastSession supports.
     */
    enum SessionEventType {
        /**
         * Application status text has changed. Event data is of type cast.framework.ApplicationStatusEventData.
         */
        APPLICATION_STATUS_CHANGED,
        /**
         * Application metadata has changed. Event data is of type cast.framework.ApplicationMetadataEventData.
         */
        APPLICATION_METADATA_CHANGED,
        /**
         * Receiver active input state has changed. Event data is of type cast.framework.ActiveInputStateEventData.
         */
        ACTIVE_INPUT_STATE_CHANGED,
        /**
         * Receiver volume or mute status has changed. Event data is of type cast.framework.VolumeEventData.
         */
        VOLUME_CHANGED,
        /**
         * Started a new media session. Event data is of type cast.framework.MediaSessionEventData.
         */
        MEDIA_SESSION,
    }
    /**
     * The possible cast session states.
     */
    enum SessionState {
        /**
         * Cast session is not established.
         */
        NO_SESSION,
        /**
         * Cast session is being established.
         */
        SESSION_STARTING,
        /**
         * Cast session is established.
         */
        SESSION_STARTED,
        /**
         * Cast session failed to start. Failure reason is provided in the event data cast.framework.SessionStateEventData#errorCode field.
         */
        SESSION_START_FAILED,
        /**
         * Cast session is being disconnected.
         */
        SESSION_ENDING,
        /**
         * Cast session is disconnected.
         */
        SESSION_ENDED,
        /**
         * Connection to an already existing session is established.
         */
        SESSION_RESUMED,
    }
    /**
     * Current sender Cast Framework version.
     */
    var VERSION: string;
    /**
     * Set the logging level for cast.
     * @param level Logging level.Value must not be null.
     */
    function setLoggerLevel(level: LoggerLevel): void;
    /**
     * Receiver active input state changed event data.
     */
    interface ActiveInputStateEventData {
        /**
         * 
         * @param activeInputState Receiver input state. Value must not be null.
         */
        new (activeInputState: ActiveInputState): ActiveInputStateEventData;
        /**
         * Receiver input state.
         */
        activeInputState?: ActiveInputState;
    }
    var ActiveInputStateEventData: ActiveInputStateEventData;
    /**
     * Cast application metadata.
     */
    interface ApplicationMetadata {
        /**
         * 
         * @param sessionObj Session data.Value must not be null.
         */
        new (sessionObj: chrome.cast.Session): ApplicationMetadata;
        /**
         * The application's id.
         */
        applicationId?: string;
        /**
         * A list of images associated with the app.
         */
        images?: chrome.cast.Image[];
        /**
         * Application's human-readable name.
         */
        name?: string;
        /**
         * A list of the namespaces supported by the receiver application.
         */
        namespaces?: string[];
    }
    var ApplicationMetadata: ApplicationMetadata;
    /**
     * Application metadata changed event data.
     */
    interface ApplicationMetadataEventData {
        /**
         * 
         * @param metadata Application metadata.Value must not be null.
         */
        new (metadata: ApplicationMetadata): ApplicationMetadataEventData;
        /**
         * Application metadata.
         */
        metadata?: ApplicationMetadata;
    }
    var ApplicationMetadataEventData: ApplicationMetadataEventData;
    /**
     * Application status text changed event data.
     */
    interface ApplicationStatusEventData {
        /**
         * 
         * @param status Receiver application status.Value may be null.
         */
        new (status: string): ApplicationStatusEventData;
        /**
         * Application status.
         */
        status?: string;
    }
    var ApplicationStatusEventData: ApplicationStatusEventData;
    /**
     * Manages cast interaction. A sigleton object that is fetched using getInstance. Manages states - provide the state of the cast icon, and session object. Cast interaction is not supported till the cast options are provided by setOptions.
     */
    interface CastContext {
        /**
         * 
         */
        new (): CastContext;
        /**
         * Adds an event listener.
         * @param type Event type.Value must not be null.
         * @param handler 
         */
        addEventListener(type: CastContextEventType, handler: (__arg0?: cast.framework.CastStateEventData | cast.framework.SessionStateEventData, __arg1?: any) => any): void;
        /**
         * Ends current session.
         * @param stopCasting Should the receiver application be stopped or just disconnected.
         */
        endCurrentSession(stopCasting: boolean): void;
        /**
         * 
         * @return Current cast icon state.
         */
        getCastState(): CastState;
        /**
         * 
         * @return Current session.
         */
        getCurrentSession(): cast.framework.CastSession;
        /**
         * 
         * @return Current session state.
         */
        getSessionState(): SessionState;
        /**
         * Removes an event listener.
         * @param type Event type.Value must not be null.
         * @param handler 
         */
        removeEventListener(type: CastContextEventType, handler: (__arg0?: cast.framework.CastStateEventData | cast.framework.SessionStateEventData, __arg1?: any) => any): void;
        /**
         * Opens the cast selection UI, to allow user to start or stop session.
         * @return If the context options were not provided yet.
         */
        requestSession(): Error;
        /**
         * Sets the cast options. Should be called only once. Events will only be sent once config was provided.
         * @param options Cast options for the page.Value must not be null.
         * @return If the options are missing application id.
         */
        setOptions(options: cast.framework.CastOptions): Error;
    }
    var CastContext: CastContext;
    /**
     * Page cast options.
     */
    interface CastOptions {
        /**
         * Indicates if to join a running session on initialization.
         */
        autoJoinPolicy?: chrome.cast.AutoJoinPolicy;
        /**
         * Language to use.
         */
        language?: string;
        /**
         * Cast application id.
         */
        receiverApplicationId?: string;
        /**
         * If true, a session will be re-joined without reloading the page.
         */
        resumeSavedSession?: boolean;
    }
    var CastOptions: CastOptions;
    /**
     * Manages a cast session.
     */
    interface CastSession {
        /**
         * 
         * @param sessionObj Session data.Value must not be null.
         * @param state Session state.Value must not be null.
         */
        new (sessionObj: chrome.cast.Session, state: SessionState): CastSession;
        /**
         * Adds an event listener.
         * @param type Event type.Value must not be null.
         * @param handler 
         */
        addEventListener(type: SessionEventType, handler: (__arg0?: ApplicationStatusEventData | ApplicationMetadataEventData | ActiveInputStateEventData | cast.framework.MediaSessionEventData | cast.framework.VolumeEventData, __arg1?: any, __arg2?: any, __arg3?: any, __arg4?: any) => any): void;
        /**
         * Adds a listener that is invoked when a message is received from the receiver application. The listener is invoked with the namespace as the first argument and the message as the second argument.
         * @param namespace The namespace to listen on, e.g. 'urn:x-cast:com.example.namespace'.
         * @param listener The listener to add.
         */
        addMessageListner(namespace: string, listener: (__arg0?: string, __arg1?: string) => any): void;
        /**
         * Ends the current session.
         * @param stopCasting Should the receiver application be stopped when ending the current session.
         */
        endSession(stopCasting: boolean): void;
        /**
         * 
         * @return Receiver active input state.
         */
        getActiveInputState(): ActiveInputState;
        /**
         * 
         * @return Application metadata.
         */
        getApplicationMetadata(): ApplicationMetadata;
        /**
         * 
         * @return Application status string.
         */
        getApplicationStatus(): string;
        /**
         * 
         * @return Cast device metadata.
         */
        getCastDevice(): chrome.cast.Receiver;
        /**
         * Returns current media session if available.
         * @return Current media session.
         */
        getMediaSession(): chrome.cast.media.Media;
        /**
         * 
         * @return Unique ID for this session.
         */
        getSessionId(): string;
        /**
         * 
         * @return Session data.
         */
        getSessionObj(): chrome.cast.Session;
        /**
         * 
         * @return Current session state.
         */
        getSessionState(): SessionState;
        /**
         * 
         * @return Receiver volume if available.
         */
        getVolume(): number;
        /**
         * 
         * @return Receiver muted status if available.
         */
        isMute(): boolean;
        /**
         * Loads media into a running receiver application.
         * @param loadRequest Value must not be null.
         * @return Promise to indicate load succeed or failed (the session is passed in to media_session event).
         */
        loadMedia(loadRequest: chrome.cast.media.LoadRequest): Promise<chrome.cast.ErrorCode>;
        /**
         * Removes an event listener.
         * @param type Event type.Value must not be null.
         * @param handler 
         */
        removeEventListener(type: SessionEventType, handler: (__arg0?: ApplicationStatusEventData | ApplicationMetadataEventData | ActiveInputStateEventData | cast.framework.MediaSessionEventData | cast.framework.VolumeEventData, __arg1?: any, __arg2?: any, __arg3?: any, __arg4?: any) => any): void;
        /**
         * Removes a previously added listener for messages.
         * @param namespace The namespace that is listened to, e.g. 'urn:x-cast:com.example.namespace'.
         * @param listener The listener to remove.
         */
        removeMessageListener(namespace: string, listener: (__arg0?: string, __arg1?: string) => any): void;
        /**
         * Sends a message to the receiver.
         * @param namespace The namespace to send the message on, e.g. 'urn:x-cast:com.example.namespace'.
         * @param data Data to be sent.
         * @return Resolved promise when message was sent, or rejected with error code if failed.
         */
        sendMessage(namespace: string, data: Object | string): Promise<chrome.cast.ErrorCode>;
        /**
         * Mute or umute the receiver.
         * @param isMute The new muted status.
         * @return Resolved promise receiver was updated, or rejected with error code if failed.
         */
        setMute(isMute: boolean): Promise<chrome.cast.ErrorCode>;
        /**
         * Sets the receiver volume.
         * @param volume The new volume level between 0.0 and 1.0.
         * @return Resolved promise receiver was updated, or rejected with error code if failed.
         */
        setVolume(volume: number): Promise<chrome.cast.ErrorCode>;
    }
    var CastSession: CastSession;
    /**
     * Data for cast state changed event.
     */
    interface CastStateEventData {
        /**
         * 
         * @param castState Current cast icon state.Value must not be null.
         */
        new (castState: CastState): CastStateEventData;
        /**
         * Cast icon state.
         */
        castState?: CastState;
    }
    var CastStateEventData: CastStateEventData;
    /**
     * Generic cast event data. Provide the event type.
     */
    interface EventData {
        /**
         * 
         * @param type The event type.Value must not be null.
         */
        new (type: cast.framework.EventType): EventData;
        /**
         * The event type.
         */
        type?: cast.framework.EventType;
    }
    var EventData: EventData;
    /**
     * Media session changed event data.
     */
    interface MediaSessionEventData {
        /**
         * 
         * @param mediaSession Media session.Value must not be null.
         */
        new (mediaSession: chrome.cast.media.Media): MediaSessionEventData;
        /**
         * Media session.
         */
        mediaSession?: chrome.cast.media.Media;
    }
    var MediaSessionEventData: MediaSessionEventData;
    /**
     * Remote player properties which are updated by cast.framework.RemotePlayerController.
     */
    interface RemotePlayer {
        /**
         * 
         */
        new (): RemotePlayer;
        /**
         * True if receiver allows pause.
         */
        canPause?: boolean;
        /**
         * True if receiver allows seeking.
         */
        canSeek?: boolean;
        /**
         * The controller for the player.
         */
        controller?: cast.common.RemotePlayer.ControllerInterface;
        /**
         * The current media playback position in seconds. In order to do playback seek, change this value and call cast.framework.RemotePlayerController#seek. When media is playing, this value will update every second.
         */
        currentTime?: number;
        /**
         * Receiver application display name.
         */
        displayName?: string;
        /**
         * Receiver status for display: it is the media title, if available, or, otherwise, the receiver status text.
         */
        displayStatus?: string;
        /**
         * The duration of current loaded media in seconds.
         */
        duration?: number;
        /**
         * Currently playing media thumbnail url.
         */
        imageUrl?: string;
        /**
         * True if the app is connected to a cast device.
         */
        isConnected?: boolean;
        /**
         * True if media is loaded on the cast device.
         */
        isMediaLoaded?: boolean;
        /**
         * True if device is muted.
         */
        isMuted?: boolean;
        /**
         * True if current media is paused.
         */
        isPaused?: boolean;
        /**
         * Currently playing media info.
         */
        mediaInfo?: chrome.cast.media.MediaInfo;
        /**
         * Current media playback state.
         */
        playerState?: chrome.cast.media.PlayerState;
        /**
         * Remote player state saved when the session has disconnected. Can be used to continue playing locally from same location on disconnect event.
         */
        savedPlayerState?: { mediaInfo?: chrome.cast.media.PlayerState, currentTime?: number };
        /**
         * Descriptive text for the current application content.
         */
        statusText?: string;
        /**
         * Current media title.
         */
        title?: string;
        /**
         * The current receiver volume level as a value between 0.0 and 1.0. 1.0 is the maximum volume possible on the receiver or stream. In order to change receiver volume, change this value and call cast.framework.RemotePlayerController#setVolumeLevel.
         */
        volumeLevel?: number;
    }
    var RemotePlayer: RemotePlayer;
    /**
     * Remote player field change event.
     */
    interface RemotePlayerChangedEvent {
        /**
         * 
         * @param type Event type.Value must not be null.
         * @param field The changed field name.
         * @param value The new field value.
         */
        new (type: RemotePlayerEventType, field: string, value: any): RemotePlayerChangedEvent;
        /**
         * The field name that was changed.
         */
        field?: string;
        /**
         * The new field value.
         */
        value?: any;
    }
    var RemotePlayerChangedEvent: RemotePlayerChangedEvent;
    /**
     * Cast remote player controller, which provides data binding for a remote player to the cast state. It manages a player object and updates its properties, providing events for player changes.
     */
    interface RemotePlayerController {
        /**
         * 
         * @param player The player to control.Value must not be null.
         */
        new (player: RemotePlayer): RemotePlayerController;
        /**
         * Registers an event handler for a player change.
         * @param type Event type.Value must not be null.
         * @param handler Event handler.
         */
        addEventListener(type: RemotePlayerEventType, handler: (__arg0?: RemotePlayerChangedEvent) => any): void;
        /**
         * Converts a number representing an interval of seconds to a string with HH:MM:SS format.
         * @param timeInSec Must be positive. Intervals longer than 100 hours get truncated silently.
         */
        getFormattedTime(timeInSec: number): void;
        /**
         * Convert current play time to a progress percentage.
         * @param currentTime The current playing time.
         * @param duration Current media total playing time.
         * @return Current seek position in percentage.
         */
        getSeekPosition(currentTime: number, duration: number): number;
        /**
         * Convert current play seek percentage to seek time.
         * @param currentPosition Current seek position in percentage.
         * @param duration Current media total playing time.
         * @return The current playing time.
         */
        getSeekTime(currentPosition: number, duration: number): number;
        /**
         * Mute or unmute the audio of the connected device.
         */
        muteOrUnmute(): void;
        /**
         * Play or pause current playing media.
         */
        playOrPause(): void;
        /**
         * Unregister an event handler for a player change.
         * @param type Event type.Value must not be null.
         * @param handler Event handler.
         */
        removeEventListener(type: RemotePlayerEventType, handler: (__arg0?: RemotePlayerChangedEvent) => any): void;
        /**
         * Seeks the media item to player currentTime value.
         */
        seek(): void;
        /**
         * Sets the volume level of the connected device to the player volumeLevel value.
         */
        setVolumeLevel(): void;
        /**
         * Stops the media player.
         */
        stop(): void;
    }
    var RemotePlayerController: RemotePlayerController;
    /**
     * Data for session state changed event.
     */
    interface SessionStateEventData {
        /**
         * 
         * @param session Current session if available.Value may be null.
         * @param sessionState Current session state.Value must not be null.
         * @param opt_errorCode Optional error code for start failed state.
         */
        new (session: CastSession, sessionState: SessionState, opt_errorCode: chrome.cast.ErrorCode): SessionStateEventData;
        /**
         * Session start failure reason.
         */
        errorCode?: chrome.cast.ErrorCode;
        /**
         * Cast session.
         */
        session?: CastSession;
        /**
         * Cast session state.
         */
        sessionState?: SessionState;
    }
    var SessionStateEventData: SessionStateEventData;
    /**
     * Receiver volume or mute changed event data.
     */
    interface VolumeEventData {
        /**
         * 
         * @param volume Current volume in range 0 to 1 (1 is max volume).Value may be null.
         * @param isMute True if device is muted.Value may be null.
         */
        new (volume: number, isMute: boolean): VolumeEventData;
        /**
         * True if device is muted.
         */
        isMute?: boolean;
        /**
         * Current volume in range 0 to 1 (1 is max volume).
         */
        volume?: number;
    }
    var VolumeEventData: VolumeEventData;
}
/**
 * This is the chrome.cast namespace.
 */
declare namespace chrome.cast {
    /**
     * Auto-join policy determines when the SDK will automatically connect a sender application to an existing session after API initialization.
     */
    enum AutoJoinPolicy {
        /**
         * Automatically connects when the session was started with the same appId, in the same tab and page origin.
         */
        TAB_AND_ORIGIN_SCOPED,
        /**
         * Automatically connects when the session was started with the same appId and the same page origin (regardless of tab).
         */
        ORIGIN_SCOPED,
        /**
         * No automatic connection.
         */
        PAGE_SCOPED,
    }
    /**
     * Capabilities that are supported by the receiver device.
     */
    enum Capability {
        /**
         * The receiver supports video output.
         */
        VIDEO_OUT,
        /**
         * The receiver supports audio output.
         */
        AUDIO_OUT,
        /**
         * The receiver supports video input (camera).
         */
        VIDEO_IN,
        /**
         * The receiver supports audio input (microphone).
         */
        AUDIO_IN,
        /**
         * The receiver represents a multi-zone group.
         */
        MULTIZONE_GROUP,
    }
    /**
     * Default action policy determines when the SDK will automatically create a session after initializing the API. This also controls the default action for the tab in the extension popup.
     */
    enum DefaultActionPolicy {
        /**
         * If the tab containing the app is being casted when the API initializes, the SDK stops tab casting and automatically launches the app. The extension popup prompts the user to cast the app.
         */
        CREATE_SESSION,
        /**
         * No automatic launch is done after initializing the API, even if the tab is being cast. The extension popup prompts the user to cast the tab.
         */
        CAST_THIS_TAB,
    }
    /**
     * Possible states of a DIAL application.
     */
    enum DialAppState {
        RUNNING,
        STOPPED,
        /**
         * Not part of the spec, used to signal errors.
         */
        ERROR,
    }
    /**
     * Errors that may be returned by the SDK.
     */
    enum ErrorCode {
        /**
         * The operation was canceled by the user.
         */
        CANCEL,
        /**
         * The operation timed out.
         */
        TIMEOUT,
        /**
         * The API is not initialized.
         */
        API_NOT_INITIALIZED,
        /**
         * The parameters to the operation were not valid.
         */
        INVALID_PARAMETER,
        /**
         * The API script is not compatible with the installed Cast extension.
         */
        EXTENSION_NOT_COMPATIBLE,
        /**
         * The Cast extension is not available.
         */
        EXTENSION_MISSING,
        /**
         * No receiver was compatible with the session request.
         */
        RECEIVER_UNAVAILABLE,
        /**
         * A session could not be created, or a session was invalid.
         */
        SESSION_ERROR,
        /**
         * A channel to the receiver is not available.
         */
        CHANNEL_ERROR,
        /**
         * Load media failed.
         */
        LOAD_MEDIA_FAILED,
    }
    /**
     * Actions that the user can take on a receiver in the extension. These can be used to show a transition in the sender application UI before the casting action has fully completed (or failed).
     */
    enum ReceiverAction {
        /**
         * The user selected a receiver with the intent of casting to it with the sender application. The exact identity of the receiver may not be known.
         */
        CAST,
        /**
         * The user requested to stop the session running on a receiver.
         */
        STOP,
    }
    /**
     * Describes availability of a Cast receiver.
     */
    enum ReceiverAvailability {
        /**
         * At least one receiver is available that is compatible with the session request.
         */
        AVAILABLE,
        /**
         * No receivers are available.
         */
        UNAVAILABLE,
    }
    enum ReceiverType {
        /**
         * Cast receiver, e.g. Chromecast
         */
        CAST,
        /**
         * DIAL device, e.g. smart TV
         */
        DIAL,
        /**
         * Hangout
         */
        HANGOUT,
        /**
         * Custom receiver provided by client
         */
        CUSTOM,
    }
    /**
     * Describes a sender application platform.
     */
    enum SenderPlatform {
        CHROME,
        IOS,
        ANDROID,
    }
    /**
     * Describes status of a Cast session to its receiver application.
     */
    enum SessionStatus {
        /**
         * The session is connected to the receiver application.
         */
        CONNECTED,
        /**
         * The session is disconnected from the receiver application. The receiver application may or may not still be running.
         */
        DISCONNECTED,
        /**
         * The receiver application has been stopped.
         */
        STOPPED,
    }
    /**
     * Flag for clients to check whether the API is loaded.
     */
    var isAvailable: boolean;
    /**
     * Default timeout values in milliseconds for API methods.
     */
    var timeout: chrome.cast.Timeout;
    /**
     * The API version. The first number is the major version, and the second the minor version.
     */
    var VERSION: number[];
    /**
     * Adds a listener function that will be invoked when the user has acted through the UI to start or stop casting. The sender application can use this to show a transition in its user interface (i.e., pause locally playing media) before the casting action has completed or failed. The listener is not guaranteed to be invoked and applications should not rely on it to function correctly. The listener will be passed the receiver that was acted upon, if available. However the receiver may not be known and null will be passed instead. The listener will be called as soon as possible after the user has acted. It should be invoked before the application is notified of the resulting state change through the API. If using Framework API, use cast.framework.CastContext#addEventListener instead and listen to cast.framework.CastContextEventType#CAST_STATE_CHANGED events.
     * @param listener The listener function to add. The first argument to the listener is the receiver that was acted on. The second argument to the listener is the action that was requested (see chrome.cast.ReceiverAction).
     */
    function addReceiverActionListener(listener: chrome.cast.ReceiverActionListener): void;
    /**
     * Initializes the API. Note that either successCallback and errorCallback will be invoked once the API has finished initialization. The sessionListener and receiverListener may be invoked at any time afterwards, and possibly more than once. If using Framework API, use cast.framework.CastContext#setOptions instead of this function.
     * @param apiConfig The object with parameters to initialize the API.Value must not be null.
     * @param successCallback 
     * @param errorCallback The possible errors are TIMEOUT, INVALID_PARAMETER, EXTENSION_MISSING.
     */
    function initialize(apiConfig: chrome.cast.ApiConfig, successCallback: () => any, errorCallback: (__arg0?: chrome.cast.Error) => any): void;
    /**
     * Logs a debug message from the app. This message may be sent in a feedback report to Google if users explicitly choose to include fine logs.
     * @param message The message to log.
     */
    function logMessage(message: string): void;
    /**
     * Send a request to precache data. If a session is connected it will send a direct request, otherwise it will send to all devices in the network.
     * @param data Data to precache.
     */
    function precache(data: string): void;
    /**
     * Removes a listener function that was previously added with addReceiverActionListener.
     * @param listener The listener function to remove.
     */
    function removeReceiverActionListener(listener: chrome.cast.ReceiverActionListener): void;
    /**
     * Requests that a receiver application session be created or joined. By default, the SessionRequest passed to the API at initialization time is used; this may be overridden by passing a different session request in opt_sessionRequest. If using Framework API, use cast.framework.CastContext#requestSession instead of this function.
     * @param successCallback 
     * @param errorCallback The possible errors are TIMEOUT, INVALID_PARAMETER, API_NOT_INITIALIZED, CANCEL, CHANNEL_ERROR, SESSION_ERROR, RECEIVER_UNAVAILABLE, and EXTENSION_MISSING. Note that the timeout timer starts after users select a receiver. Selecting a receiver requires user's action, which has no timeout. If a session request is already in progress, errorCallback is invoked with INVALID_PARAMETER error code and a description explaining the error.
     * @param opt_sessionRequest 
     */
    function requestSession(successCallback: (__arg0?: chrome.cast.Session) => any, errorCallback: (__arg0?: chrome.cast.Error) => any, opt_sessionRequest: chrome.cast.SessionRequest): void;
    /**
     * Requests to join an existing session with the given id. Once joined, the session will be passed to the sessionListener set by chrome.cast.initialize.If the session with the given sessionId is already known when this function is called, then sessionListener is called immediately. Otherwise, once a session with the given sessionId is discovered, sessionListener will be called.
     * @param sessionId The id of the session to join.
     */
    function requestSessionById(sessionId: string): void;
    /**
     * Sets custom receiver list
     * @param receivers The new list.Value must not be null.
     * @param successCallback 
     * @param errorCallback The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, and EXTENSION_MISSRING.
     */
    function setCustomReceivers(receivers: chrome.cast.Receiver[], successCallback: () => any, errorCallback: (__arg0?: chrome.cast.Error) => any): void;
    /**
     * Sets the receiver name and display status. To show the receiver as idle, set displayStatus to null.Only valid for CUSTOM receivers. The receiver's displayStatus is ignored if this receiver is CAST; Cast receiver status is updated by the receiver application.
     * @param receiver The receiver.Value must not be null.
     * @param successCallback Callback when setting status succeeds.
     * @param errorCallback The possible errors are TIMEOUT, INVALID_PARAMETER, API_NOT_INITIALIZED, and EXTENSION_MISSING.
     */
    function setReceiverDisplayStatus(receiver: chrome.cast.Receiver, successCallback: () => any, errorCallback: (__arg0?: chrome.cast.Error) => any): void;
    /**
     * Utility method to unescape URI-escaped strings. For example, the receiver friendly name is returned as an URI-escaped string. Use this method to unescape that string if needed.
     * @param escaped A string to unescape
     * @return Unescaped string
     */
    function unescape(escaped: string): string;
    interface ReceiverActionListener {
    }
    var ReceiverActionListener: ReceiverActionListener;
    interface ApiConfig {
        /**
         * Holds the configuration for the API when initialized.
         * @param sessionRequest The session request.Value must not be null.
         * @param sessionListener A listener to notify when a session is available to the application.
         * @param receiverListener A listener to notify when there is a receiver available.
         * @param opt_autoJoinPolicy The auto join policy for the application.
         * @param opt_defaultActionPolicy The default action to take when the user is already casting when the application is initialized.
         */
        new (sessionRequest: chrome.cast.SessionRequest, sessionListener: (__arg0?: chrome.cast.Session) => any, receiverListener: (__arg0?: ReceiverAvailability) => any, opt_autoJoinPolicy: AutoJoinPolicy, opt_defaultActionPolicy: DefaultActionPolicy): ApiConfig;
        /**
         * Determines whether the SDK will automatically connect to a running session after initialization.
         */
        autoJoinPolicy?: AutoJoinPolicy;
        /**
         * Requests whether the application should be launched on API initialization when the tab is already being cast. Apps in embedded content (like iframes) should set this field to CAST_THIS_TAB if they are not the main app on the page. This value also configures the default behavior of the extension popup for the page.
         */
        defaultActionPolicy?: DefaultActionPolicy;
        /**
         * Function invoked when the availability of a Cast receiver that supports the application in sessionRequest is known or changes. This function will always be invoked at least once after initialization completes.
         */
        receiverListener?: (__arg0?: ReceiverAvailability) => any;
        /**
         * Listener invoked when a session is created or connected by the SDK. This function may be invoked after initialization, if there is a session that is automatically created or connected. Note that requestSession method does not cause this listener to be invoked, since it has its own success callback.
         */
        sessionListener?: (__arg0?: chrome.cast.Session) => any;
        /**
         * Describes the session to launch or the session to connect.
         */
        sessionRequest?: chrome.cast.SessionRequest;
    }
    var ApiConfig: ApiConfig;
    interface DialRequest {
        /**
         * A request to start a DIAL app.
         * @param appName The DIAL app name.
         * @param opt_launchParameter The dial app launch parameter.
         */
        new (appName: string, opt_launchParameter: string): DialRequest;
        /**
         * DIAL app name.
         */
        appName?: string;
        /**
         * Launch parameter to be passed to the DIAL receiver application URL as POST data.
         */
        launchParameter?: string;
    }
    var DialRequest: DialRequest;
    interface Error {
        /**
         * Describes an error returned by the API. Normally, these objects should not be created by the client.
         * @param code The error code.Value must not be null.
         * @param opt_description Description of the error.
         * @param opt_details Details specific to the error.
         */
        new (code: ErrorCode, opt_description: string, opt_details: Object): Error;
        /**
         * The error code.
         */
        code?: ErrorCode;
        /**
         * Human readable description of the error.
         */
        description?: string;
        /**
         * Details specific to the error. The description of the error code will include the format of the object if one is set.
         */
        details?: Object;
    }
    var Error: Error;
    interface Image {
        /**
         * An image that describes a receiver application or media item. This could be an application icon, cover art, or a thumbnail.
         * @param url The URL to the image.
         */
        new (url: string): Image;
        /**
         * The height of the image.
         */
        height?: number;
        /**
         * The URL to the image.
         */
        url?: string;
        /**
         * The width of the image.
         */
        width?: number;
    }
    var Image: Image;
    interface Receiver {
        /**
         * Describes the receiver running an application. Normally, these objects should not be created by the client.
         * @param label An identifier for the receiver.
         * @param friendlyName The user-visible name of the receiver.
         * @param opt_capabilities Set of receiver capabilities.
         * @param opt_volume The receiver's current volume.
         */
        new (label: string, friendlyName: string, opt_capabilities: Capability[], opt_volume: chrome.cast.Volume): Receiver;
        /**
         * The capabilities of the receiver, for example audio and video.
         */
        capabilities?: Capability[];
        /**
         * Receiver status shown to the user in the extension UI. Only valid for CUSTOM receivers. To show the receiver as idle, set displayStatus to null.
         */
        displayStatus?: chrome.cast.ReceiverDisplayStatus;
        /**
         * The user given name (URI-escaped) for the receiver. Mandatory.
         */
        friendlyName?: string;
        /**
         * The value reflects whether the cast device is the active input. If the HDMI input the Cast device is connected to supports CEC and the device can know the active status, this value will be provided. Otherwise, it is null.
         */
        isActiveInput?: boolean;
        /**
         * An identifier for the receiver that is unique to the browser profile and the origin of the API client. It is stable across browser restarts, but may change if the user clears his local storage.
         */
        label?: string;
        /**
         * The type of receiver device. Mandatory.
         */
        receiverType?: ReceiverType;
        /**
         * The current volume of the receiver. If non-null, the volume's level and muted properties will always be set.
         */
        volume?: chrome.cast.Volume;
    }
    var Receiver: Receiver;
    interface ReceiverDisplayStatus {
        /**
         * Receiver status shown to the user in the extension UI. Only valid for CUSTOM receivers.
         * @param statusText Description of current application status in plain text, for example, name of the content being shown.
         * @param appImages Images associated with the app.Value must not be null.
         */
        new (statusText: string, appImages: Image[]): ReceiverDisplayStatus;
        /**
         * Array of images available describing the application.
         */
        appImages?: Image[];
        /**
         * Whether the user is offered the choice to stop the application.The default value is null, which means extension chooses a default for CUSTOM receivers, and detect DELETE availability for DIAL receivers. |true| means the user can request to stop the application and |false| means they cannot.
         */
        showStop?: boolean;
        /**
         * Descriptive text for the current application content, for example “My Wedding Slideshow”.
         */
        statusText?: string;
    }
    var ReceiverDisplayStatus: ReceiverDisplayStatus;
    interface SenderApplication {
        /**
         * Describes a sender application. Normally, these objects should not be created by the client.
         * @param platform Value must not be null.
         */
        new (platform: SenderPlatform): SenderApplication;
        /**
         * The identifier or URL for the application in the respective platform's app store.
         */
        packageId?: string;
        /**
         * The supported platform.
         */
        platform?: SenderPlatform;
        /**
         * URL or intent to launch the application.
         */
        url?: string;
    }
    var SenderApplication: SenderApplication;
    interface Session {
        /**
         * Describes the state of a currently running Cast application. Normally, these objects should not be created by the client.
         * @param sessionId The session identifier.
         * @param appId The receiver application identifier.
         * @param displayName The display name of the application.
         * @param appImages Images associated with the app.Value must not be null.
         * @param receiver The receiver that is running the app.Value must not be null.
         */
        new (sessionId: string, appId: string, displayName: string, appImages: Image[], receiver: Receiver): Session;
        /**
         * The identifer of the Cast application. Not for display.
         */
        appId?: string;
        /**
         * Array of images available describing the application.
         */
        appImages?: Image[];
        /**
         * The human-readable name of the Cast application, for example, "YouTube".
         */
        displayName?: string;
        /**
         * The media that belong to this Cast session, including those loaded by other senders.
         */
        media?: chrome.cast.media.Media[];
        /**
         * A list of the namespaces supported by the receiver application.
         */
        namespaces?: {}[];
        /**
         * The receiver that is running the application.
         */
        receiver?: Receiver;
        /**
         * The sender applications supported by the receiver application. This may be used to prompt the user to install or visit the sender application.
         */
        senderApps?: SenderApplication[];
        /**
         * Uniquely identifies this instance of the receiver application.
         */
        sessionId?: string;
        /**
         * Status of this Cast session to the receiver application.
         */
        status?: SessionStatus;
        /**
         * Descriptive text for the current application content, for example “My Wedding Slideshow”.
         */
        statusText?: string;
        /**
         * Identifier that uniquely describes this session for transport purposes. This is internal to communication channel.
         */
        transportId?: string;
        /**
         * Adds a listener that is invoked when a media session is created by another sender.
         * @param listener The listener to add.
         */
        addMediaListener(listener: (__arg0?: chrome.cast.media.Media) => any): void;
        /**
         * Adds a listener that is invoked when a message is received from the receiver application. The listener is invoked with the the namespace as the first argument and the message as the second argument.
         * @param namespace The namespace to listen on, e.g. 'urn:x-cast:com.example.namespace'.
         * @param listener The listener to add.
         */
        addMessageListener(namespace: string, listener: (__arg0?: string, __arg1?: string) => any): void;
        /**
         * Adds a listener that is invoked when the Session has changed. Changes to the following properties will trigger the listener: statusText, namespaces, status, and the volume of the receiver.Listeners should check the status property of the Session to determine its connection status. The boolean parameter isAlive is deprecated in favor of the status Session property. The isAlive parameter is still passed in for backwards compatibility, and is true unless status = chrome.cast.SessionStatus.STOPPED.
         * @param listener The listener to add.
         */
        addUpdateListener(listener: (__arg0?: boolean) => any): void;
        /**
         * Leaves (disconnects) from the running receiver application associated with the session.Existing clients within the scope defined by this client's AutoJoinPolicy will be disconnected. Future clients will not automatically join the session that was left.All disconnected clients will have their session update listeners called with isAlive = true. Listeners should check the status property of the Session to determine its connection status since isAlive is deprecated. In this case, status = chrome.cast.SessionStatus.DISCONNECTED.
         * @param successCallback 
         * @param errorCallback The possible errors are TIMEOUT, API_NOT_INITIALIZED, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        leave(successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Loads media into a running receiver application.
         * @param loadRequest Request to load media.Value must not be null.
         * @param successCallback Invoked with the loaded Media on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        loadMedia(loadRequest: chrome.cast.media.LoadRequest, successCallback: (__arg0?: chrome.cast.media.Media) => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Loads and optionally starts playback of a new queue of media items into a running receiver application.
         * @param queueLoadRequest Request to load a new queue of media items.Value must not be null.
         * @param successCallback Invoked with the loaded Media on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueLoad(queueLoadRequest: chrome.cast.media.QueueLoadRequest, successCallback: (__arg0?: chrome.cast.media.Media) => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Removes a listener that was previously added with addMediaListener.
         * @param listener The listener to remove.
         */
        removeMediaListener(listener: (__arg0?: chrome.cast.media.Media) => any): void;
        /**
         * Removes a previously added listener for messages.
         * @param namespace The namespace that is listened to, e.g. 'urn:x-cast:com.example.namespace'.
         * @param listener The listener to remove.
         */
        removeMessageListener(namespace: string, listener: (__arg0?: string, __arg1?: string) => any): void;
        /**
         * Removes a previously added listener for this Session.
         * @param listener The listener to remove.
         */
        removeUpdateListener(listener: (__arg0?: boolean) => any): void;
        /**
         * Sends a message to the receiver application on the given namespace. The successCallback is invoked when the message has been submitted to the messaging channel. Delivery to the receiver application is best effort and not guaranteed.
         * @param namespace The namespace to send the message on, e.g. 'urn:x-cast:com.example.namespace'.
         * @param message 
         * @param successCallback Invoked when the message has been sent.Value must not be null.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        sendMessage(namespace: string, message: Object | string, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Sets the receiver volume.
         * @param muted The new muted status.
         * @param successCallback 
         * @param errorCallback The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        setReceiverMuted(muted: boolean, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Sets the receiver volume.
         * @param newLevel The new volume level between 0.0 and 1.0.
         * @param successCallback 
         * @param errorCallback The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        setReceiverVolumeLevel(newLevel: number, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Stops the running receiver application associated with the session.
         * @param successCallback 
         * @param errorCallback The possible errors are TIMEOUT, API_NOT_INITIALIZED, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        stop(successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
    }
    var Session: Session;
    interface SessionRequest {
        /**
         * A request to start or connect to a session.
         * @param appId The receiver application id.
         * @param opt_capabilities Required capabilities for the receiver.Value must not be null.
         * @param opt_timeout Optional timeout for requesting a session for this application.
         */
        new (appId: string, opt_capabilities: Capability[], opt_timeout: number): SessionRequest;
        /**
         * The receiver application id.
         */
        appId?: string;
        /**
         * Capabilities required of the receiver device.
         */
        capabilities?: Capability[];
        language?: string;
        /**
         * The timeout used for requesting a session for the application in milliseconds. Defaults to the value of chrome.cast.timeout.requestSession.
         */
        requestSessionTimeout?: number;
    }
    var SessionRequest: SessionRequest;
    interface Timeout {
        /**
         * Defines default timeout values in milliseconds for API methods.
         */
        new (): Timeout;
        /**
         * Default Session.leave timeout values in milliseconds.
         */
        leaveSession?: number;
        /**
         * Default requestSession timeout values in milliseconds.
         */
        requestSession?: number;
        /**
         * Default sendMessage (custom message) timeout values in milliseconds.
         */
        sendCustomMessage?: number;
        /**
         * Default setReceiverVolume timeout values in milliseconds.
         */
        setReceiverVolume?: number;
        /**
         * Default Session.stop timeout values in milliseconds.
         */
        stopSession?: number;
    }
    var Timeout: Timeout;
    interface Volume {
        /**
         * The volume of a device or media stream.
         * @param opt_level The volume level.Value may be null.
         * @param opt_muted The mute status.Value may be null.
         */
        new (opt_level: number, opt_muted: boolean): Volume;
        /**
         * The current volume level as a value between 0.0 and 1.0. 1.0 is the maximum volume possible on the receiver or stream.
         */
        level?: number;
        /**
         * Whether the receiver is muted, independent of the volume level.
         */
        muted?: boolean;
    }
    var Volume: Volume;
}
/**
 * This is the chrome.cast.games namespace.
 */
declare namespace chrome.cast.games {
    /**
     * Game SDK specific error codes returned by the receiver that extend the codes from chrome.cast.ErrorCode.
     */
    enum GameManagerErrorCode {
        /**
         * Error code indicating the request is invalid or contains invalid parameters.
         */
        INVALID_REQUEST,
        /**
         * Error code indicating that the request was disallowed and could not be completed.
         */
        NOT_ALLOWED,
        /**
         * Error code indicating the SDK version in the request does not match the version expected by the game manager.
         */
        INCORRECT_VERSION,
        /**
         * Error code indicating the number of players connected and available on the receiver is greater than the maximum number of players specified in the configuration object for the receiver game.
         */
        TOO_MANY_PLAYERS,
    }
    /**
     * Event types dispatched by chrome.cast.games.GameManagerClient.
     */
    enum GameManagerEventType {
        /**
         * The event is undefined.
         */
        UNKNOWN,
        /**
         * Triggered by chrome.cast.games.GameManagerClient when the state of the currently running game has changed. The listener for this event will use chrome.cast.games.GameManagerStateChangedEvent.
         */
        STATE_CHANGED,
        /**
         * Triggered by chrome.cast.games.GameManagerClient when the receiver sends a game message for a specific player. The listener for this event will use chrome.cast.games.GameManagerGameMessageReceivedEvent.
         */
        GAME_MESSAGE_RECEIVED,
    }
    /**
     * Represents the game manager states.
     */
    enum GameplayState {
        /**
         * Unknown game state.
         */
        UNKNOWN,
        /**
         * Game state for when the game is loading.
         */
        LOADING,
        /**
         * Game state for when the game is running.
         */
        RUNNING,
        /**
         * Game state for when the game is paused.
         */
        PAUSED,
        /**
         * Game state for when the game is showing an information screen.
         */
        SHOWING_INFO_SCREEN,
    }
    /**
     * Represents the game lobby states.
     */
    enum LobbyState {
        /**
         * Unknown lobby state.
         */
        UNKNOWN,
        /**
         * Lobby is open and accepting players to join.
         */
        OPEN,
        /**
         * Lobby is closed and not accepting players.
         */
        CLOSED,
    }
    /**
     * Represents the player states.
     */
    enum PlayerState {
        /**
         * Unknown player state.
         */
        UNKNOWN,
        /**
         * The player is no longer connected to the receiver because of a network drop.
         */
        DROPPED,
        /**
         * The player has manually chosen to disconnect from the receiver.
         */
        QUIT,
        /**
         * The player is connected to the receiver and available to join a game.
         */
        AVAILABLE,
        /**
         * The player is connected to the receiver, and ready to enter the game.
         */
        READY,
        /**
         * The player is connected to the receiver, in the game, and idle.
         */
        IDLE,
        /**
         * The player is in the game and actively playing.
         */
        PLAYING,
    }
    interface GameManagerClient {
        /**
         * Used to allow a sender to interact with the cast game manager running on the receiver. Keeps track of player, game, and lobby state information and can send requests to the game manager on the receiver.Do not instantiate this class directly. Instead, use chrome.cast.games.GameManagerClient.getInstanceFor to get an instance.
         * @param session An existing cast session.Value must not be null.
         */
        new (session: Session): GameManagerClient;
        /**
         * Asynchronously obtains a GameManagerClient instance for the given cast session. The successCallback will be called with a result object that contains the GameManagerClient after initialization is completed successfully.
         * @param session An existing cast session.Value must not be null.
         * @param successCallback Value must not be null.
         * @param errorCallback Value may be null.
         */
        getInstanceFor(session: Session, successCallback: (__arg0?: chrome.cast.games.GameManagerInstanceResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Adds a listener for a game manager event type. When the event is triggered, the listener will be called with an implementation of chrome.cast.games.GameManagerEvent that corresponds to the event type. For example, chrome.cast.games.GameManagerPlayerInfoEvent corresponds to the chrome.cast.games.GameManagerEventType.PLAYER_INFO_CHANGED event type.
         * @param type 
         * @param listener 
         */
        addEventListener(type: GameManagerEventType, listener: (__arg0?: chrome.cast.games.GameManagerEvent) => any): void;
        /**
         * Disposes this object, releasing all used resources.
         */
        dispose(): void;
        /**
         * Returns the current state of the game manager.This method will throw an error if this GameManagerClient has been disposed.
         */
        getCurrentState(): chrome.cast.games.GameManagerState;
        /**
         * Returns the last controllable player ID used by this sender or null if there is no known last controllable player ID. Useful for the common case when there is only one player per sender.This method will throw an error if this GameManagerClient has been disposed.
         */
        getLastUsedPlayerId(): string;
        /**
         * Returns whether this client has already been disposed.
         * @return Whether this client has been disposed.
         */
        isDisposed(): boolean;
        /**
         * Removes a previously added listener for a game manager event type.
         * @param type 
         * @param listener 
         */
        removeEventListener(type: GameManagerEventType, listener: (__arg0?: chrome.cast.games.GameManagerEvent) => any): void;
        /**
         * Sends a game specific message to the receiver, its contents entirely up to the application. The message will originate from the last used controllable player. This is a fire and forget method where there is no guarantee the message is sent and the receiver will not send a response back to the sender. This method will throw an error if this GameManagerClient has been disposed.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         */
        sendGameMessage(extraMessageData: Object): void;
        /**
         * Sends a game specific message to the receiver, its contents entirely up to the application. This is a fire and forget method where there is no guarantee the message is sent and the receiver will not send a response back to the sender.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The player ID of the controllable player sending this message.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         */
        sendGameMessageWithPlayerId(playerId: string, extraMessageData: Object): void;
        /**
         * Sends a game specific message to the receiver, its contents entirely up to the application. The message will originate from the last used controllable player. The receiver will send a response back to this sender.This method will throw an error if this GameManagerClient has been disposed.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendGameRequest(extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a game specific message to the receiver, its contents entirely up to the application. The receiver will send a response back to this sender.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The player ID of the controllable player sending this message.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendGameRequestWithPlayerId(playerId: string, extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver to transition the last used player by this sender into chrome.cast.games.PlayerState.AVAILABLE. If the player's transition is not valid an error will be returned in the error callback. If the last used player is unknown a new player will be registered its player ID will be set as the last used player when the receiver responds to this request.This method will throw an error if this GameManagerClient has been disposed.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerAvailableRequest(extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver to transition a player into chrome.cast.games.PlayerState.AVAILABLE. If the player's transition is not valid an error will be returned in the error callback. If playerId is null a new player will be registered its player ID will be set as the last used player when the receiver responds to this request.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The id of the player to transition.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerAvailableRequestWithPlayerId(playerId: string, extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver to transition the last used player by this sender into chrome.cast.games.PlayerState.IDLE state. If the player's transition is not valid an error will be returned in the error callback. This method will throw an error if this GameManagerClient has been disposed, or if there is no last used player id.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerIdleRequest(extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver transition the specified player into chrome.cast.games.PlayerState.IDLE. If this is not a valid transition for that player an error will be returned in the error callback.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The id of the player to transition.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerIdleRequestWithPlayerId(playerId: string, extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver to transition the last used player by this sender into chrome.cast.games.PlayerState.PLAYING state. If the player's transition is not valid an error will be returned in the error callback. This method will throw an error if this GameManagerClient has been disposed, or if there is no last used player id.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerPlayingRequest(extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver transition the specified player into chrome.cast.games.PlayerState.PLAYING. If this is not a valid transition for that player an error will be returned in the error callback.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The id of the player to transition.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerPlayingRequestWithPlayerId(playerId: string, extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver to transition the last used player by this sender into chrome.cast.games.PlayerState.QUIT state.This method will throw an error if this GameManagerClient has been disposed, or if there is no last used player id.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerQuitRequest(extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver transition the specified player into chrome.cast.games.PlayerState.QUIT.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The id of the player to transition.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerQuitRequestWithPlayerId(playerId: string, extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver to transition the last used player by this sender into chrome.cast.games.PlayerState.READY state. If the player's transition is not valid an error will be returned in the error callback. This method will throw an error if this GameManagerClient has been disposed, or if the last used player ID is unknown.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerReadyRequest(extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
        /**
         * Sends a request to the receiver transition the specified player into chrome.cast.games.PlayerState.READY. If this is not a valid transition for that player an error will be returned in the error callback.This method will throw an error if this GameManagerClient has been disposed.
         * @param playerId The id of the player to transition.
         * @param extraMessageData Application-specific JSON serializable data to pass along with the request.
         * @param successCallback Callback triggered when the request is processed successfully or null.Value may be null.
         * @param errorCallback Callback triggered when the request fails or null.Value may be null.
         */
        sendPlayerReadyRequestWithPlayerId(playerId: string, extraMessageData: Object, successCallback: (__arg0?: chrome.cast.games.GameManagerResult) => any, errorCallback: (__arg0?: chrome.cast.games.GameManagerError) => any): void;
    }
    var GameManagerClient: GameManagerClient;
    interface GameManagerError {
        /**
         * Represents an error from the game manager or from the chrome sender SDK.
         * @param errorCode The type of error.
         * @param errorDescription A human readable error description or null.Value may be null.
         * @param result Additional information about the request that triggered this error. This is null if the errorCode parameter is chrome.cast.games.GameManagerErrorCode.CAST_ERROR.
         * @param castError This is null if the errorCode parameter is not chrome.cast.games.GameManagerErrorCode.CAST_ERROR. otherwise, it is set to a chrome sender SDK specific error code.
         */
        new (errorCode: GameManagerErrorCode, errorDescription: string, result: chrome.cast.games.GameManagerResult, castError: Error): GameManagerError;
        /**
         * Chrome sender SDK specific error-code. Set only if the errorCode parameter is not chrome.cast.games.GameManagerErrorCode.CAST_ERROR.
         */
        castError?: Error;
        /**
         * The type of error.
         */
        errorCode?: GameManagerErrorCode;
        /**
         * A human readable error description or null.
         */
        errorDescription?: string;
        /**
         * Additional information about the request that triggered this error (e.g. the request ID, the player ID). This is null if the errorCode parameter is chrome.cast.games.GameManagerErrorCode.CAST_ERROR.
         */
        result?: chrome.cast.games.GameManagerResult;
    }
    var GameManagerError: GameManagerError;
    interface GameManagerGameMessageReceivedEvent {
        /**
         * Event dispatched by chrome.cast.games.GameManagerClient when the receiver sends a game message for a specific player.
         * @param playerId 
         * @param gameMessage 
         */
        new (playerId: string, gameMessage: Object): GameManagerGameMessageReceivedEvent;
        /**
         * The game message sent from the receiver.
         */
        gameMessage?: Object;
        /**
         * The player ID associated with the game message.
         */
        playerId?: string;
        /**
         * The type of event.
         */
        type?: GameManagerEventType;
    }
    var GameManagerGameMessageReceivedEvent: GameManagerGameMessageReceivedEvent;
    interface GameManagerInstanceResult {
        /**
         * Result of a game manager getInstanceFor request.
         * @param gameManagerClient sent by the game manager or null.
         */
        new (gameManagerClient: GameManagerClient): GameManagerInstanceResult;
        /**
         * The game manager client, ready to be interacted with.
         */
        gameManagerClient?: GameManagerClient;
    }
    var GameManagerInstanceResult: GameManagerInstanceResult;
    interface GameManagerResult {
        /**
         * Result of a game manager request to the receiver.
         * @param playerId Player ID of the request.
         * @param requestId Request ID for the request this is a response to.
         * @param extraMessageData Application-specific JSON serializable data sent by the game manager or null.
         */
        new (playerId: string, requestId: number, extraMessageData: Object): GameManagerResult;
        /**
         * Application-specific JSON serializable data sent by the game manager or null.
         */
        extraMessageData?: Object;
        /**
         * The player ID of the request.
         */
        playerId?: string;
        /**
         * The request ID for the request this is a response to.
         */
        requestId?: number;
    }
    var GameManagerResult: GameManagerResult;
    interface GameManagerState {
        /**
         * Immutable class to represent a snapshot of the game manager state.
         * @param applicationName 
         * @param maxPlayers 
         * @param lobbyState 
         * @param gameplayState 
         * @param gameData 
         * @param gameStatusText 
         * @param players Value must not be null.
         */
        new (applicationName: string, maxPlayers: number, lobbyState: LobbyState, gameplayState: GameplayState, gameData: Object, gameStatusText: string, players: chrome.cast.games.PlayerInfo[]): GameManagerState;
        /**
         * Returns true if this object and the provided {chrome.cast.games.GameManagerState} are equivalent.
         * @param otherState Value must not be null.
         */
        equals(otherState: GameManagerState): boolean;
        /**
         * Returns the name of the running application.
         */
        getApplicationName(): string;
        /**
         * Returns the list of players in a connected state that are also managed by this sender device. A player is considered to be in a connected state if the associated chrome.cast.games.PlayerInfo#playerState is one of chrome.cast.games.PlayerState.IDLE, chrome.cast.games.PlayerState.AVAILABLE, chrome.cast.games.PlayerState.PLAYING or chrome.cast.games.PlayerState.READY.
         */
        getConnectedControllablePlayers(): chrome.cast.games.PlayerInfo[];
        /**
         * Returns the list of players in a connected state. A player is considered to be in a connected state if the associated chrome.cast.games.PlayerInfo#playerState is one of chrome.cast.games.PlayerState.IDLE, chrome.cast.games.PlayerState.AVAILABLE, chrome.cast.games.PlayerState.PLAYING or chrome.cast.games.PlayerState.READY.
         */
        getConnectedPlayers(): chrome.cast.games.PlayerInfo[];
        /**
         * Returns the list of player information for players created and managed by this sender device.
         */
        getControllablePlayers(): chrome.cast.games.PlayerInfo[];
        /**
         * Returns the game data.
         */
        getGameData(): Object;
        /**
         * Returns the gameplay state.
         */
        getGameplayState(): GameplayState;
        /**
         * Returns the game status text.
         */
        getGameStatusText(): string;
        /**
         * Returns a list of player id that are different between this object and the provided chrome.cast.games.GameManagerState. This includes players that were added, removed, or have changed in any way.
         * @param otherState Value must not be null.
         */
        getListOfChangedPlayers(otherState: GameManagerState): string[];
        /**
         * Returns the lobby state.
         */
        getLobbyState(): LobbyState;
        /**
         * Returns the maximum number of players supported by the running application.
         */
        getMaxPlayers(): number;
        /**
         * Returns the player with the provided id, or null if that player does not exist.
         * @param playerId The playerId of the desired player.
         */
        getPlayer(playerId: string): chrome.cast.games.PlayerInfo;
        /**
         * Returns the list of players.
         */
        getPlayers(): chrome.cast.games.PlayerInfo[];
        /**
         * Returns a list of players that are in the specified player state.
         * @param playerState 
         */
        getPlayersInState(playerState: PlayerState): chrome.cast.games.PlayerInfo[];
        /**
         * Returns whether the game data is different between this object and the provided chrome.cast.games.GameManagerState.
         * @param otherState Value must not be null.
         */
        hasGameDataChanged(otherState: GameManagerState): boolean;
        /**
         * Returns whether the gameplay state is different between this object and the provided chrome.cast.games.GameManagerState.
         * @param otherState Value must not be null.
         */
        hasGameplayStateChanged(otherState: GameManagerState): boolean;
        /**
         * Returns whether the game data is different between this object and the provided chrome.cast.games.GameManagerState.
         * @param otherState Value must not be null.
         */
        hasGameStatusTextChanged(otherState: GameManagerState): boolean;
        /**
         * Returns whether the lobby state is different between this object and the provided chrome.cast.games.GameManagerState.
         * @param otherState Value must not be null.
         */
        hasLobbyStateChanged(otherState: GameManagerState): boolean;
        /**
         * Returns whether the player with the provided player id has changed between this object and the provided chrome.cast.games.GameManagerState.
         * @param playerId 
         * @param otherState Value must not be null.
         */
        hasPlayerChanged(playerId: string, otherState: GameManagerState): boolean;
        /**
         * Returns whether the player data of the player with the specified player id has changed between this object and the provided chrome.cast.games.GameManagerState.
         * @param playerId 
         * @param otherState Value must not be null.
         */
        hasPlayerDataChanged(playerId: string, otherState: GameManagerState): boolean;
        /**
         * Returns whether the player state of the player with the specified player id has changed between this object and the provided chrome.cast.games.GameManagerState.
         * @param playerId 
         * @param otherState Value must not be null.
         */
        hasPlayerStateChanged(playerId: string, otherState: GameManagerState): boolean;
    }
    var GameManagerState: GameManagerState;
    interface GameManagerStateChangedEvent {
        /**
         * Event dispatched by chrome.cast.games.GameManagerClient when the state of the currently running game has changed.
         * @param currentState Value must not be null.
         * @param previousState Value must not be null.
         */
        new (currentState: GameManagerState, previousState: GameManagerState): GameManagerStateChangedEvent;
        /**
         * The current state.
         */
        currentState?: GameManagerState;
        /**
         * The previous state.
         */
        previousState?: GameManagerState;
        /**
         * The type of event.
         */
        type?: GameManagerEventType;
    }
    var GameManagerStateChangedEvent: GameManagerStateChangedEvent;
    interface PlayerInfo {
        /**
         * Represents player information maintained by the game manager.
         * @param playerId 
         * @param playerState 
         * @param playerData 
         * @param isControllable 
         */
        new (playerId: string, playerState: PlayerState, playerData: Object, isControllable: boolean): PlayerInfo;
        /**
         * Returns true if this object and the provided chrome.cast.games.PlayerInfo are equivalent.
         * @param other Value must not be null.
         */
        equals(other: PlayerInfo): boolean;
        /**
         * Returns the player data for this player.
         */
        getPlayerData(): Object;
        /**
         * Returns the player id of this player.
         */
        getPlayerId(): string;
        /**
         * Returns the player state for this player.
         */
        getPlayerState(): PlayerState;
        /**
         * Returns true if this player is in a connected state. A player is considered to be in a connected state if the associated chrome.cast.games.PlayerInfo#playerState is one of chrome.cast.games.PlayerState.IDLE, chrome.cast.games.PlayerState.AVAILABLE, chrome.cast.games.PlayerState.PLAYING or chrome.cast.games.PlayerState.READY.
         */
        isConnected(): boolean;
        /**
         * Returns true if this player was created on this sender.
         */
        isControllable(): boolean;
    }
    var PlayerInfo: PlayerInfo;
}
/**
 * This is the chrome.cast.media namespace.
 */
declare namespace chrome.cast.media {
    /**
     * Possible reason why a media is idle.
     */
    enum IdleReason {
        /**
         * A sender requested to stop playback using the STOP command.
         */
        CANCELLED,
        /**
         * A sender requested playing a different media using the LOAD command.
         */
        INTERRUPTED,
        /**
         * The media playback completed.
         */
        FINISHED,
        /**
         * The media was interrupted due to an error, this could be for example if the player could not download media due to networking errors.
         */
        ERROR,
    }
    /**
     * Possible media commands supported by the receiver application.
     */
    enum MediaCommand {
        PAUSE,
        SEEK,
        STREAM_VOLUME,
        STREAM_MUTE,
    }
    /**
     * Possible types of media metadata.
     */
    enum MetadataType {
        /**
         * Generic template suitable for most media types. Used by chrome.cast.media.GenericMediaMetadata.
         */
        GENERIC,
        /**
         * A full length movie. Used by chrome.cast.media.MovieMediaMetadata.
         */
        MOVIE,
        /**
         * An episode of a TV series. Used by chrome.cast.media.TvShowMediaMetadata.
         */
        TV_SHOW,
        /**
         * A music track. Used by chrome.cast.media.MusicTrackMediaMetadata.
         */
        MUSIC_TRACK,
        /**
         * Photo. Used by chrome.cast.media.PhotoMediaMetadata.
         */
        PHOTO,
    }
    /**
     * Possible states of the media player.
     */
    enum PlayerState {
        /**
         * No media is loaded into the player.
         */
        IDLE,
        /**
         * The media is playing.
         */
        PLAYING,
        /**
         * The media is not playing.
         */
        PAUSED,
        /**
         * Player is in PLAY mode but not actively playing content. currentTime will not change.
         */
        BUFFERING,
    }
    /**
     * Possible states of queue repeat mode.
     */
    enum RepeatMode {
        /**
         * Items are played in order, and when the queue is completed (the last item has ended) the media session is terminated.
         */
        OFF,
        /**
         * The items in the queue will be played indefinitely. When the last item has ended, the first item will be played again.
         */
        ALL,
        /**
         * The current item will be repeated indefinitely.
         */
        SINGLE,
        /**
         * The items in the queue will be played indefinitely. When the last item has ended, the list of items will be randomly shuffled by the receiver, and the queue will continue to play starting from the first item of the shuffled items.
         */
        ALL_AND_SHUFFLE,
    }
    /**
     * States of the media player after resuming.
     */
    enum ResumeState {
        /**
         * Force media to start.
         */
        PLAYBACK_START,
        /**
         * Force media to pause.
         */
        PLAYBACK_PAUSE,
    }
    /**
     * Possible media stream types.
     */
    enum StreamType {
        /**
         * Stored media streamed from an existing data store.
         */
        BUFFERED,
        /**
         * Live media generated on the fly.
         */
        LIVE,
        /**
         * None of the above.
         */
        OTHER,
    }
    /**
     * Possible text track edge types.
     */
    enum TextTrackEdgeType {
        NONE,
        OUTLINE,
        DROP_SHADOW,
        RAISED,
        DEPRESSED,
    }
    /**
     * Possible text track font generic family.
     */
    enum TextTrackFontGenericFamily {
        SANS_SERIF,
        MONOSPACED_SANS_SERIF,
        SERIF,
        MONOSPACED_SERIF,
        CASUAL,
        CURSIVE,
        SMALL_CAPITALS,
    }
    /**
     * Possible text track font style.
     */
    enum TextTrackFontStyle {
        NORMAL,
        BOLD,
        BOLD_ITALIC,
        ITALIC,
    }
    /**
     * Possible text track types.
     */
    enum TextTrackType {
        /**
         * Transcription or translation of the dialogue, suitable for when the sound is available but not understood (e.g. because the user does not understand the language of the media resource's soundtrack).
         */
        SUBTITLES,
        /**
         * Transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information, suitable for when the soundtrack is unavailable (e.g. because it is muted or because the user is deaf). Displayed over the video; labeled as appropriate for the hard-of-hearing.
         */
        CAPTIONS,
        /**
         * Textual descriptions of the video component of the media resource, intended for audio synthesis when the visual component is unavailable (e.g. because the user is interacting with the application without a screen, or because the user is blind). Synthesized as separate audio track.
         */
        DESCRIPTIONS,
        /**
         * Chapter titles, intended to be used for navigating the media resource.
         */
        CHAPTERS,
        /**
         * Tracks intended for use from script.
         */
        METADATA,
    }
    /**
     * Possible text track window types.
     */
    enum TextTrackWindowType {
        NONE,
        NORMAL,
        ROUNDED_CORNERS,
    }
    /**
     * Possible media track types.
     */
    enum TrackType {
        TEXT,
        AUDIO,
        VIDEO,
    }
    /**
     * The app ID of the default media player.
     */
    var DEFAULT_MEDIA_RECEIVER_APP_ID: string;
    /**
     * Default timeout values in milliseconds for media API methods.
     */
    var timeout: any;
    interface EditTracksInfoRequest {
        /**
         * A request to modify the text tracks style or change the tracks status. If a trackId does not match the existing trackIds the whole request will fail and no status will change. It is acceptable to change the text track style even if no text track is currently active.
         * @param opt_activeTrackIds 
         * @param opt_textTrackStyle 
         */
        new (opt_activeTrackIds: number[], opt_textTrackStyle: chrome.cast.media.TextTrackStyle): EditTracksInfoRequest;
        /**
         * Array of the Track trackIds that should be active. If it is not provided, the active tracks will not change. If the array is empty, no track will be active.
         */
        activeTrackIds?: number[];
        requestId?: number;
        /**
         * The requested text track style. If it is not provided the existing style will be used.
         */
        textTrackStyle?: chrome.cast.media.TextTrackStyle;
    }
    var EditTracksInfoRequest: EditTracksInfoRequest;
    interface GenericMediaMetadata {
        /**
         * A generic media description.
         */
        new (): GenericMediaMetadata;
        /**
         * Content images. Examples would include cover art or a thumbnail of the currently playing media.
         */
        images?: Image[];
        /**
         * The type of metadata.
         */
        metadataType?: MetadataType;
        /**
         * ISO 8601 date and/or time when the content was released, e.g. 2014-02-10.
         */
        releaseDate?: string;
        /**
         * Integer year when the content was released.
         */
        releaseYear?: number;
        /**
         * Content subtitle.
         */
        subtitle?: string;
        /**
         * Content title.
         */
        title?: string;
        /**
         * The type of metadata.
         */
        type?: MetadataType;
    }
    var GenericMediaMetadata: GenericMediaMetadata;
    interface GetStatusRequest {
        /**
         * A request to get the media status.
         */
        new (): GetStatusRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
    }
    var GetStatusRequest: GetStatusRequest;
    interface LoadRequest {
        /**
         * A request to load new media into the player.
         * @param mediaInfo Media description.Value must not be null.
         */
        new (mediaInfo: chrome.cast.media.MediaInfo): LoadRequest;
        /**
         * Array of Track trackIds that should be active. If the array is not provided, the default tracks will be active. If two incompatible trackIds are provided (for example two active audio tracks) the command will fail with INVALID_PARAMETER.
         */
        activeTrackIds?: number[];
        /**
         * Whether the media will automatically play.
         */
        autoplay?: boolean;
        /**
         * Seconds from the beginning of the media to start playback.
         */
        currentTime?: number;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * Media description.
         */
        media?: chrome.cast.media.MediaInfo;
        requestId?: number;
        /**
         * Identifies the application session that will load the media.
         */
        sessionId?: string;
        type?: string;
    }
    var LoadRequest: LoadRequest;
    interface Media {
        /**
         * Represents a media item that has been loaded into the receiver application.
         * @param sessionId The session identifier.
         * @param mediaSessionId The media identifier.
         */
        new (sessionId: string, mediaSessionId: number): Media;
        /**
         * List of IDs corresponding to the active Tracks.
         */
        activeTrackIds?: number[];
        /**
         * Item ID of the item that was active in the queue (it may not be playing) at the time the media status change happened.
         */
        currentItemId?: number;
        /**
         * The current playback position in seconds since the start of the media. This member is only updated sporadically, so its value is often out of date. Use the getEstimatedTime method to get an estimate of the real playback position based on the last information reported by the receiver.
         */
        currentTime?: number;
        /**
         * Custom data set by the receiver application.
         */
        customData?: Object;
        /**
         * Idle reason if receiver knows.
         */
        idleReason?: IdleReason;
        /**
         * Array of sorted items in the queue.
         */
        items?: chrome.cast.media.QueueItem[];
        /**
         * Item ID of the item that is currently loading on the receiver. Null if no item is currently loading.
         */
        loadingItemId?: number;
        /**
         * Media description.
         */
        media?: chrome.cast.media.MediaInfo;
        /**
         * Identifies the media item.
         */
        mediaSessionId?: number;
        /**
         * The playback rate. 1.0 represents normal playback.
         */
        playbackRate?: number;
        /**
         * The player state.
         */
        playerState?: PlayerState;
        /**
         * ID of the next Item, only available if it has been preloaded. On the receiver media items can be preloaded and cached temporarily in memory, so when they are loaded later on, the process is faster (as the media does not have to be fetched from the network).
         */
        preloadedItemId?: number;
        /**
         * The repeat mode for playing the queue.
         */
        repeatMode?: RepeatMode;
        /**
         * Identifies the session that is hosting the media.
         */
        sessionId?: string;
        /**
         * The media commands supported by the media player.
         */
        supportedMediaCommands?: MediaCommand[];
        /**
         * The media stream volume. volume.level and volume.muted will always be set.
         */
        volume?: Volume;
        /**
         * Adds a listener that is invoked when the status of the media has changed. Changes to the following properties will trigger the listener: currentTime, volume, metadata, playbackRate, playerState, customData. A successful call to the media's getStatus method will also trigger the listener.
         * @param listener The listener to add. The parameter indicates whether the Media object is still alive.
         */
        addUpdateListener(listener: (__arg0?: boolean) => any): void;
        /**
         * Modifies the text tracks style or change the tracks status. If a trackId does not match the existing trackIds the whole request will fail and no status will change.
         * @param editTracksInfoRequest Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        editTracksInfo(editTracksInfoRequest: EditTracksInfoRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Estimates the current playback position based on the last information reported by the receiver.
         * @return An estimate of the current playback position in seconds since the start of the media.
         */
        getEstimatedTime(): number;
        /**
         * Gets the status of the media item from the receiver application.Along with the given successCallback, any added media update listeners will also be invoked when the status is received from the receiver application. Instead of calling this method to poll the media status, apps should prefer relying on the automatic invocation of media update listeners whenever the media changes.
         * @param getStatusRequest The optional get status request.
         * @param successCallback Invoked when the status is received from the receiver application.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        getStatus(getStatusRequest: GetStatusRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Pauses the media item.
         * @param pauseRequest 
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The media pause request. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        pause(pauseRequest: chrome.cast.media.PauseRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Plays the media item.
         * @param playRequest The optional media play request.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        play(playRequest: chrome.cast.media.PlayRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Appends a new media item to the end of the queue.
         * @param item Item to append to the end of the queue. Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueAppendItem(item: chrome.cast.media.QueueItem, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Inserts a list of new media items into the queue.
         * @param queueInsertItemsRequest Request to insert media items into the media queue.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueInsertItems(queueInsertItemsRequest: chrome.cast.media.QueueInsertItemsRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Plays the item with itemId in the queue.If itemId is not found in the queue, either because it wasn't there originally or it was removed by another sender before calling this function, this function will silently return without sending a request to the receiver.
         * @param itemId The ID of the item to which to jump.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueJumpToItem(itemId: number, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Moves the item with itemId to be at position newIndex in the queue.If itemId is not found in the queue, either because it wasn't there originally or it was removed by another sender before calling this function, this function will silently return without sending a request to the receiver.errorCallback will be invoked if newIndex is negative. However if newIndex overflows, either because it was wrongly specified or the queue was shrunk by another sender, the item will be moved to the end of the queue.
         * @param itemId The ID of the item to be moved.Value must not be null.
         * @param newIndex The new index of the item.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueMoveItemToNewIndex(itemId: number, newIndex: number, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Jumps to the next item in the queue.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueNext(successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Jumps to the previous item in the queue.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queuePrev(successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Removes the item with itemId from the queue.If itemId is not found in the queue, either because it wasn't there originally or it was removed by another sender before calling this function, this function will silently return without sending a request to the receiver.
         * @param itemId The ID of the item to be removed.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueRemoveItem(itemId: number, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Reorder a list of media items in the queue.
         * @param queueReorderItemsRequest Request to reorder items in the media queue.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueReorderItems(queueReorderItemsRequest: chrome.cast.media.QueueReorderItemsRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Sets the repeat mode of the queue.
         * @param repeatMode The algorithm for selection of the next item when the current item has ended.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueSetRepeatMode(repeatMode: RepeatMode, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Updates properties of the media queue, e.g. repeat mode, and properties of the existing items in the media queue.
         * @param queueUpdateItemsRequest Request to update the properties of the media queue.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        queueUpdateItems(queueUpdateItemsRequest: chrome.cast.media.QueueUpdateItemsRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Removes a previously added listener for this Media.
         * @param listener The listener to remove.
         */
        removeUpdateListener(listener: (__arg0?: boolean) => any): void;
        /**
         * Seeks the media item.
         * @param seekRequest The media seek request.Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        seek(seekRequest: chrome.cast.media.SeekRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Sets the media stream volume. At least one of volumeRequest.level or volumeRequest.muted must be set. Changing the mute state does not affect the volume level, and vice versa.
         * @param volumeRequest The set volume request. Value must not be null.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        setVolume(volumeRequest: chrome.cast.media.VolumeRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Stops the media player.
         * @param stopRequest The stop request.
         * @param successCallback Invoked on success.
         * @param errorCallback Invoked on error. The possible errors are TIMEOUT, API_NOT_INITIALIZED, INVALID_PARAMETER, CHANNEL_ERROR, SESSION_ERROR, and EXTENSION_MISSING.
         */
        stop(stopRequest: chrome.cast.media.StopRequest, successCallback: () => any, errorCallback: (__arg0?: Error) => any): void;
        /**
         * Determines whether the media player supports the given media command.
         * @param command The command to query.Value must not be null.
         * @return True if the player supports the command.
         */
        supportsCommand(command: MediaCommand): boolean;
    }
    var Media: Media;
    interface MediaInfo {
        /**
         * Describes a media item.
         * @param contentId Unique identifier for the media.
         * @param contentType MIME content type of the media.
         */
        new (contentId: string, contentType: string): MediaInfo;
        /**
         * Identifies the content. Typically a URL, but can be any string identifier.
         */
        contentId?: string;
        /**
         * MIME content type of the media.
         */
        contentType?: string;
        /**
         * Custom data set by the receiver application.
         */
        customData?: Object;
        /**
         * Duration of the content, in seconds. May be null for media with type chrome.cast.media.StreamType.LIVE.
         */
        duration?: number;
        /**
         * Describes the media content. The value should be one of the chrome.cast.media.*Metadata objects.
         */
        metadata?: any;
        /**
         * The type of media stream.
         */
        streamType?: StreamType;
        /**
         * The requested text track style. If not provided, the device style preferences (if existing) will be used.
         */
        textTrackStyle?: chrome.cast.media.TextTrackStyle;
        /**
         * Array of Track objects.
         */
        tracks?: chrome.cast.media.Track[];
    }
    var MediaInfo: MediaInfo;
    interface MovieMediaMetadata {
        /**
         * A movie media description.
         */
        new (): MovieMediaMetadata;
        /**
         * Content images. Examples would include cover art or a thumbnail of the currently playing media.
         */
        images?: Image[];
        /**
         * The type of metadata.
         */
        metadataType?: MetadataType;
        /**
         * ISO 8601 date when the movie was released, e.g. 2014-02-10.
         */
        releaseDate?: string;
        /**
         * Integer year when the content was released.
         */
        releaseYear?: number;
        /**
         * Movie studio.
         */
        studio?: string;
        /**
         * Movie subtitle.
         */
        subtitle?: string;
        /**
         * Movie title.
         */
        title?: string;
        /**
         * The type of metadata.
         */
        type?: MetadataType;
    }
    var MovieMediaMetadata: MovieMediaMetadata;
    interface MusicTrackMediaMetadata {
        /**
         * A music track media description.
         */
        new (): MusicTrackMediaMetadata;
        /**
         * Album artist name.
         */
        albumArtist?: string;
        /**
         * Album name.
         */
        albumName?: string;
        /**
         * Track artist name.
         */
        artist?: string;
        /**
         * Track artist name.
         */
        artistName?: string;
        /**
         * Track composer name.
         */
        composer?: string;
        /**
         * Disc number. A positive integer.
         */
        discNumber?: number;
        /**
         * Content images. Examples would include cover art or a thumbnail of the currently playing media.
         */
        images?: Image[];
        /**
         * The type of metadata.
         */
        metadataType?: MetadataType;
        /**
         * ISO 8601 date when the track was released, e.g. 2014-02-10.
         */
        releaseDate?: string;
        /**
         * Integer year when the album was released.
         */
        releaseYear?: number;
        /**
         * Track name.
         */
        songName?: string;
        /**
         * Track title.
         */
        title?: string;
        /**
         * Track number in album. A positive integer.
         */
        trackNumber?: number;
        /**
         * The type of metadata.
         */
        type?: MetadataType;
    }
    var MusicTrackMediaMetadata: MusicTrackMediaMetadata;
    interface PauseRequest {
        /**
         * A request to pause the currently playing media.
         */
        new (): PauseRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
    }
    var PauseRequest: PauseRequest;
    interface PhotoMediaMetadata {
        /**
         * A photo media description.
         */
        new (): PhotoMediaMetadata;
        /**
         * Name of the photographer.
         */
        artist?: string;
        /**
         * ISO 8601 date and time the photo was taken, e.g. 2014-02-10T15:47:00Z.
         */
        creationDateTime?: string;
        /**
         * Photo height, in pixels.
         */
        height?: number;
        /**
         * Images associated with the content. Examples would include a photo thumbnail.
         */
        images?: Image[];
        /**
         * Latitude.
         */
        latitude?: number;
        /**
         * Location where the photo was taken. For example, "Seattle, Washington, USA".
         */
        location?: string;
        /**
         * Longitude.
         */
        longitude?: number;
        /**
         * The type of metadata.
         */
        metadataType?: MetadataType;
        /**
         * Photo title.
         */
        title?: string;
        /**
         * The type of metadata.
         */
        type?: MetadataType;
        /**
         * Photo width, in pixels.
         */
        width?: number;
    }
    var PhotoMediaMetadata: PhotoMediaMetadata;
    interface PlayRequest {
        /**
         * A request to play the currently paused media.
         */
        new (): PlayRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
    }
    var PlayRequest: PlayRequest;
    interface QueueInsertItemsRequest {
        /**
         * A request to insert a list of new media items into the queue.
         * @param itemsToInsert The list of media items to insert. Must not be null or empty. The itemId of each item must not be set (as they will be assigned by the receiver).Value must not be null.
         */
        new (itemsToInsert: chrome.cast.media.QueueItem[]): QueueInsertItemsRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * ID of the item that will be located immediately after the inserted list. If null or not found the list will be appended to the end of the queue.
         */
        insertBefore?: number;
        /**
         * List of queue items to insert. The itemId field of the items should be empty or the request will fail with an INVALID_PARAMS error. It is sorted (first element will be played first).
         */
        items?: chrome.cast.media.QueueItem[];
    }
    var QueueInsertItemsRequest: QueueInsertItemsRequest;
    interface QueueItem {
        /**
         * Represents an item in a media queue.
         * @param mediaInfo Media infoValue must not be null.
         */
        new (mediaInfo: MediaInfo): QueueItem;
        /**
         * Array of Track trackIds that should be active. If the array is not provided, the default tracks will be active. If two incompatible trackIds are provided (for example two active audio tracks) the command will fail with INVALID_PARAMETER.
         */
        activeTrackIds?: number[];
        /**
         * Whether the media will automatically play.
         */
        autoplay?: boolean;
        /**
         * Custom data set by the receiver application.
         */
        customData?: Object;
        /**
         * Unique identifier of the item in the queue. If used in chrome.cast.media.QueueLoad or chrome.cast.media.QueueInsert it must be null (as it will be assigned by the receiver when an item is first created/inserted). For other operations it is mandatory.
         */
        itemId?: number;
        /**
         * Media description.
         */
        media?: MediaInfo;
        /**
         * Playback duration of the item in seconds. If it is larger than the actual duration - startTime it will be limited to the actual duration - startTime. It can be negative, in such case the duration will be the actual item duration minus the duration provided. A duration of value zero effectively means that the item will not be played.
         */
        playbackDuration?: number;
        /**
         * This parameter is a hint for the receiver to preload this media item before it is played. It allows for a smooth transition between items played from the queue. The time is expressed in seconds, relative to the beginning of this item playback (usually the end of the previous item playback). Only positive values are valid. For example, if the value is 10 seconds, this item will be preloaded 10 seconds before the previous item has finished. The receiver will try to honor this value but will not guarantee it, for example if the value is larger than the previous item duration the receiver may just preload this item shortly after the previous item has started playing (there will never be two items being preloaded in parallel). Also, if an item is inserted in the queue just after the currentItem and the time to preload is higher than the time left on the currentItem, the preload will just happen as soon as possible.
         */
        preloadTime?: number;
        /**
         * Seconds from the beginning of the media to start playback.
         */
        startTime?: number;
    }
    var QueueItem: QueueItem;
    interface QueueLoadRequest {
        /**
         * A request to load and optionally start playback of a new ordered list of media items.
         * @param items The list of media items to load. Must not be null or empty.Value must not be null.
         */
        new (items: QueueItem[]): QueueLoadRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * Array of items to load. It is sorted (first element will be played first). Must not be null or empty.
         */
        items?: QueueItem[];
        /**
         * The algorithm for selection of the next item when the current item has ended.
         */
        repeatMode?: RepeatMode;
        /**
         * The index of the item in the items array that must be the first currentItem (the item that will be played first). Note this is the index of the array (starts at 0) and not the itemId (as it is not known until the queue is created). If repeatMode is chrome.cast.media.RepeatMode.OFF playback will end when the last item in the array is played (elements before the startIndex will not be played). This may be useful for continuation scenarios where the user was already using the sender app and in the middle decides to cast. In this way the sender app does not need to map between the local and remote queue positions or saves one extra request to update the queue.
         */
        startIndex?: number;
    }
    var QueueLoadRequest: QueueLoadRequest;
    interface QueueRemoveItemsRequest {
        /**
         * A request to remove a list of items from the queue. If the remaining queue is empty, the media session will be terminated.
         * @param itemIdsToRemove The list of media item IDs to remove. Must not be null or empty.Value must not be null.
         */
        new (itemIdsToRemove: number[]): QueueRemoveItemsRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * The list of media item IDs to remove. If any of the items does not exist it will be ignored. Duplicated item IDs will also be ignored. Must not be null or empty.
         */
        itemIds?: number[];
    }
    var QueueRemoveItemsRequest: QueueRemoveItemsRequest;
    interface QueueReorderItemsRequest {
        /**
         * A request to reorder a list of media items in the queue.
         * @param itemIdsToReorder The list of media item IDs to reorder. Must not be null or empty.Value must not be null.
         */
        new (itemIdsToReorder: number[]): QueueReorderItemsRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * ID of the item that will be located immediately after the reordered list. If null or not found, the reordered list will be appended at the end of the queue. This ID can not be one of the IDs in the itemIds list.
         */
        insertBefore?: number;
        /**
         * The list of media item IDs to reorder, in the new order. Items not provided will keep their existing order (without the items being reordered). The provided list will be inserted at the position determined by insertBefore. For example:If insertBefore is not specified Existing queue: “A”,”D”,”G”,”H”,”B”,”E” itemIds: “D”,”H”,”B” New Order: “A”,”G”,”E”,“D”,”H”,”B”If insertBefore is “A” Existing queue: “A”,”D”,”G”,”H”,”B” itemIds: “D”,”H”,”B” New Order: “D”,”H”,”B”,“A”,”G”,”E”If insertBefore is “G” Existing queue: “A”,”D”,”G”,”H”,”B” itemIds: “D”,”H”,”B” New Order: “A”,“D”,”H”,”B”,”G”,”E”If any of the items does not exist it will be ignored. Must not be null or empty.
         */
        itemIds?: number[];
    }
    var QueueReorderItemsRequest: QueueReorderItemsRequest;
    interface QueueUpdateItemsRequest {
        /**
         * A request to update properties of the existing items in the media queue.
         * @param itemsToUpdate List of queue items to be updated. No reordering will happen, the items will retain the existing order and will be fully replaced with the ones provided, including the media information. The items not provided in this list will remain unchanged. The tracks information can not change once the item is loaded (if the item is the currentItem). If any of the items does not exist it will be ignored.Value must not be null.
         */
        new (itemsToUpdate: QueueItem[]): QueueUpdateItemsRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * List of queue items to be updated. No reordering will happen, the items will retain the existing order and will be fully replaced with the ones provided, including the media information. The items not provided in this list will remain unchanged. The tracks information can not change once the item is loaded (if the item is the currentItem). If any of the items does not exist it will be ignored.
         */
        items?: QueueItem[];
    }
    var QueueUpdateItemsRequest: QueueUpdateItemsRequest;
    interface SeekRequest {
        /**
         * A request to seek the current media.
         */
        new (): SeekRequest;
        /**
         * The new current time for the media, in seconds after the start of the media. If the media type is chrome.cast.media.StreamType.LIVE, then currentTime is optional; if not set, the stream will resume at the live media position.
         */
        currentTime?: number;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * The desired media player state after the seek is complete. If unset, it will retain the state it had before seeking.
         */
        resumeState?: ResumeState;
    }
    var SeekRequest: SeekRequest;
    interface StopRequest {
        /**
         * A request to stop the media player.
         */
        new (): StopRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
    }
    var StopRequest: StopRequest;
    interface TextTrackStyle {
        /**
         * Describes style information for a text track.Colors are represented as strings “#RRGGBBAA” where XX are the two hexadecimal symbols that represent the 0-255 value for the specific channel/color. It follows CSS 8-digit hex color notation (See http://dev.w3.org/csswg/css-color/#hex-notation).
         */
        new (): TextTrackStyle;
        /**
         * Background RGBA color, represented as "#RRGGBBAA". The alpha channel should be used for transparent backgrounds.
         */
        backgroundColor?: string;
        /**
         * Custom application data.
         */
        customData?: Object;
        /**
         * RGBA color for the edge, represented as "#RRGGBBAA". This value will be ignored if edgeType is NONE.
         */
        edgeColor?: string;
        edgeType?: TextTrackEdgeType;
        /**
         * If the font is not available in the receiver the fontGenericFamily will be used.
         */
        fontFamily?: string;
        fontGenericFamily?: TextTrackFontGenericFamily;
        /**
         * The font scaling factor for the text track (the default is 1.0).
         */
        fontScale?: number;
        fontStyle?: TextTrackFontStyle;
        /**
         * Foreground RGBA color, represented as "#RRGGBBAA".
         */
        foregroundColor?: string;
        /**
         * RGBA color for the window, represented as "#RRGGBBAA". This value will be ignored if windowType is NONE.
         */
        windowColor?: string;
        /**
         * Rounded corner radius absolute value in pixels (px). This value will be ignored if windowType is not ROUNDED_CORNERS.
         */
        windowRoundedCornerRadius?: number;
        /**
         * The window concept is defined in CEA-608 and CEA-708, See http://goo.gl/M3ea0X. In WebVTT is called a region.
         */
        windowType?: TextTrackWindowType;
    }
    var TextTrackStyle: TextTrackStyle;
    interface Track {
        /**
         * Describes track metadata information.
         * @param trackId Unique identifier of the track within the context of a chrome.cast.media.MediaInfo object.
         * @param trackType The type of track.Value must not be null.
         */
        new (trackId: number, trackType: TrackType): Track;
        /**
         * Custom application data.
         */
        customData?: Object;
        /**
         * Language tag as per RFC 5646. Mandatory when the subtype is SUBTITLES.
         */
        language?: string;
        /**
         * A descriptive, human readable name for the track. For example, “Spanish”. This can be used by the sender UI for example, to create a selection dialog. If the name is empty the dialog would contain an empty slot.
         */
        name?: string;
        /**
         * For text tracks, the type of text track.
         */
        subtype?: TextTrackType;
        /**
         * Identifier of the track’s content. It can be the url of the track or any other identifier that allows the receiver to find the content (when the track is not inband or included in the manifest). For example it can be the url of a vtt file.
         */
        trackContentId?: string;
        /**
         * The MIME type of the track content. For example if the track is a vtt file it will be ‘text/vtt’. This field is needed for out of band tracks, so it is usually provided if a trackContentId has also been provided. It is not mandatory if the receiver has a way to identify the content from the trackContentId, but recommended. The track content type, if provided, must be consistent with the track type.
         */
        trackContentType?: string;
        /**
         * Unique identifier of the track within the context of a chrome.cast.media.MediaInfo object.
         */
        trackId?: number;
        /**
         * The type of track.
         */
        type?: TrackType;
    }
    var Track: Track;
    interface TvShowMediaMetadata {
        /**
         * A TV episode media description.
         */
        new (): TvShowMediaMetadata;
        /**
         * TV episode number. A positive integer.
         */
        episode?: number;
        /**
         * TV episode number. A positive integer.
         */
        episodeNumber?: number;
        /**
         * TV episode title.
         */
        episodeTitle?: string;
        /**
         * Content images. Examples would include cover art or a thumbnail of the currently playing media.
         */
        images?: Image[];
        /**
         * The type of metadata.
         */
        metadataType?: MetadataType;
        /**
         * ISO 8601 date when the episode originally aired, e.g. 2014-02-10.
         */
        originalAirdate?: string;
        /**
         * Integer year when the content was released.
         */
        releaseYear?: number;
        /**
         * TV episode season. A positive integer.
         */
        season?: number;
        /**
         * TV episode season. A positive integer.
         */
        seasonNumber?: number;
        /**
         * TV series title.
         */
        seriesTitle?: string;
        /**
         * TV episode title.
         */
        title?: string;
        /**
         * The type of metadata.
         */
        type?: MetadataType;
    }
    var TvShowMediaMetadata: TvShowMediaMetadata;
    interface VolumeRequest {
        /**
         * A request to set the stream volume of the playing media.
         * @param volume The new volume of the stream.Value must not be null.
         */
        new (volume: Volume): VolumeRequest;
        /**
         * Custom data for the receiver application.
         */
        customData?: Object;
        /**
         * The new volume of the stream. At least one of level or muted must be set.
         */
        volume?: Volume;
    }
    var VolumeRequest: VolumeRequest;
}
