<?php 			
				if ( in_category('yingxiang')) {
					include(TEMPLATEPATH . '/category-imgs.php');
        }
        else if ( in_category('jingdian')) {
					include(TEMPLATEPATH . '/category-imgs.php');
				}
				else {
					include(TEMPLATEPATH . '/category-words.php');
				}
			?>