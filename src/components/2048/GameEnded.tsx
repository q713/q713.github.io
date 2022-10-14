import {Dialog} from "@headlessui/react";
import {GameState} from "../../domain/Constants";
import {Component} from "react";

type GameEndedState = {
    gameState: GameState,
    points: number,
    closeModal: () => void
};

type GameEndedProps = {
    gameState: GameState,
    points: number,
    closeModal: () => void
};

export class GameEnded extends Component<GameEndedProps, {}> {

    constructor(props: GameEndedProps) {
        super(props);
    }

    render() {
        return <Dialog open={this.props.gameState === GameState.GAME_WON || this.props.gameState === GameState.GAME_OVER}
                        as="div" className="relative z-10" onClose={this.props.closeModal}>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel
                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left
                                    align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {this.props.gameState === GameState.GAME_OVER ? "Game Over!" : "You won!"}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {this.props.gameState === GameState.GAME_OVER
                                    ? `The game is over. You reached a score of ${this.props.points}!`
                                    : `You reached a 2048 tile with a score of ${this.props.points}!`}
                            </p>
                        </div>

                        <div className="mt-4">
                            <button type="button" className="inline-flex justify-center rounded-md border
                                            border-transparent bg-stone-800 px-4 py-2 text-sm font-medium
                                            hover:bg-stone-800 focus:outline-none focus-visible:ring-2
                                            focus-visible:ring-stone-800 focus-visible:ring-offset-2 text-white"
                                    onClick={this.props.closeModal}>
                                Back to the game!
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    }
}