from flask import Blueprint, render_template, request, redirect
import random

bp = Blueprint('__name__', __name__, template_folder='templates')

def random_string(length=16):
	final_string = ''
	chars = 'abcdefghijklmnopqrstuvwxyz123456789'
	
	for i in range(0, length):
		final_string += chars[random.randint(0, len(chars) - 1)]
	
	return final_string


@bp.route('/createplanet', methods=['POST', 'GET'])
def show():
    if request.method == 'POST':
    	if request.form.get('createplanet'):

    		with open('LCOapp/planets/{}.planet'.format(random_string()), 'w+') as _file:
    			_file.write("Name : {}\n".format(request.form.get('planet name')))
    			_file.write("Size : {}\n".format(request.form.get('planet size')))
    			_file.write("Distance: {}\n".format(request.form.get('planet distance')))
    			_file.write("Ordinality: {}\n".format(request.form.get('planet ordinality')))
    			_file.write("Description: {}\n".format(request.form.get('planet description')))
    		_file.close()

    		return redirect('/')

    return render_template('createplanet.html')