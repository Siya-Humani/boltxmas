from flask import Flask, render_template, redirect, url_for, request, session
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Secret key for session management

# Path to the file that will track the winners (names and count)
WINNER_FILE = 'winners_list.txt'
MAX_WINNERS = 200

# Initialize the winner file if it doesn't exist
if not os.path.exists(WINNER_FILE):
    with open(WINNER_FILE, 'w') as f:
        f.write('')  # Start with an empty file

def get_winners_list():
    """Get the list of winners from the file."""
    with open(WINNER_FILE, 'r') as f:
        winners = f.readlines()
    return [winner.strip() for winner in winners]  # Remove any newline characters

def add_winner(winner_name):
    """Add a winner to the list if the max winner count is not reached."""
    winners = get_winners_list()
    if len(winners) < MAX_WINNERS and winner_name not in winners:
        winners.append(winner_name)
        with open(WINNER_FILE, 'a') as f:
            f.write(winner_name + '\n')  # Append the new winner to the file
    return len(winners)

@app.route('/')
def index():
    """Render the main game page."""
    winner_count = len(get_winners_list())  # Get the current count of winners

    # If user has already played, redirect to tryagain
    if session.get('has_played', False):
        return redirect(url_for('try_again'))

    return render_template('index.html', winner_count=winner_count, max_winners=MAX_WINNERS)

@app.route('/spin', methods=['POST'])
def spin():
    """Handle spin and determine if the user wins."""
    winner_count = len(get_winners_list())

    # If the number of winners is less than the max allowed and user hasn't played yet
    if winner_count < MAX_WINNERS:
        if session.get('has_played', False):
            return redirect(url_for('try_again'))  # Prevent user from playing again
        
        # Simulate the landing on the prize slice (for demonstration purposes)
        prize_landed = request.form.get('landed_on_prize') == 'true'  # Simulate if user landed on prize

        # Mark that the user has played
        session['has_played'] = True

        if prize_landed:
            winner_name = request.form.get('winner_name', 'Unknown Player')
            new_winner_count = add_winner(winner_name)
            if new_winner_count <= MAX_WINNERS:
                return redirect(url_for('prize'))
            else:
                return redirect(url_for('all_winners'))
        else:
            return redirect(url_for('try_again'))

    return redirect(url_for('all_winners'))

@app.route('/prize')
def prize():
    """Page shown when the user wins."""
    return render_template('prize.html')

@app.route('/tryagain')
def try_again():
    """Page shown when the user doesn't win or tries to play more than once."""
    return render_template('tryagain.html')

@app.route('/allwinners')
def all_winners():
    """Page showing all winners when the max number is reached."""
    winners = get_winners_list()  # Get the current list of winners
    winner_count = len(winners)  # Get the count of winners
    return render_template('allwinners.html', winners=winners, winner_count=winner_count)

if __name__ == '__main__':
    app.run(debug=True)


