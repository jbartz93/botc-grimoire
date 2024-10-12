import { PLAYING_STATUSES, Status } from './status';

class Player {
  private name = '';
  private status = Status.NOT_PRESENT;
  private travelling = false;

  isAlive() {
    return this.status == Status.ALIVE;
  }

  hasVote() {
    return this.isAlive() || this.status == Status.ONE_VOTE;
  }

  isPlaying() {
    return this.status != Status.NOT_PRESENT;
  }

  isPlayingNotTravelling() {
    return this.isPlaying() && !this.travelling;
  }

  rotateStatus() {
    if (!this.isPlaying()) {
      return;
    }
    this.setStatus(PLAYING_STATUSES[this.status + 1 % PLAYING_STATUSES.length]);
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: Status) {
    this.status = status;
  }

  isTravelling() {
    return this.travelling;
  }

  setTravelling(travelling: boolean) {
    this.travelling = travelling;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    if (name && !this.isPlaying()) {
      this.setStatus(Status.ALIVE);
    } else if (!name) {
      this.setStatus(Status.NOT_PRESENT);
    }
    this.name = name;
  }
}
